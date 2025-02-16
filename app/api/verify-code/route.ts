// app/api/verify-code/route.ts
import { NextResponse } from 'next/server';
import { python } from 'pythonia';

export async function POST(request: Request) {
  try {
    const { code, testCases } = await request.json();

    if (!code || !testCases || typeof code !== 'string') {
      return NextResponse.json({ passed: false, error: 'Invalid input' });
    }

    const wrappedCode = `
def user_solution(*args):
    ${code
      .split('\n')
      .map(line => '    ' + line)
      .join('\n')}

def run_tests(test_cases):
    try:
        for test in test_cases:
            inputs = test['inputs']
            expected = test['expected']
            actual = user_solution(*inputs)
            if actual != expected:
                return False
        return True
    except Exception as e:
        return False

result = run_tests(${JSON.stringify(testCases)})
print(result)
`;

    const pyInstance = await python(process.env.PYTHON_PATH || 'python3');
    const passed = await pyInstance.eval(wrappedCode);
    await pyInstance.close();

    return NextResponse.json({ passed });
  } catch (error) {
    return NextResponse.json({ passed: false, error: 'Error executing code' });
  }
}
