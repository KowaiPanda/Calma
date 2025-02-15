import CodeEditor from "../components/code-editor";

export default function Page() {
  return (
    <div className="flex h-screen mx-4 gap-4 py-4">
      <article className="text-neutral-100 min-w-[400px] rounded-lg p-4 bg-midnight-purple/80 border-neutral-100 border shadow-lg shadow-mystic-teal">
        <h1 className="text-3xl">Binary Search</h1>
        <h2 className="text-2xl">Story</h2>
        <p>
          epic binary search story
        </p>
        <h2 className="text-2xl">Explanation</h2>
        <p>
          Binary search is a search algorithm that finds the position of a 
          target value within a sorted array.
        </p>
        <h2 className="text-2xl">Algorithm</h2>
        <ol className="list-decimal list-inside">
          <li>Set <code>left</code> to 0 and <code>right</code> to <code>length - 1</code>.</li>
          <li>While <code>left</code> is less than or equal to <code>right</code>:</li>
          <ul className="list-disc list-inside ml-4">
            <li>Set <code>mid</code> to <code>left + (right - left) / 2</code>.</li>
            <li>If the element at <code>mid</code> is equal to the target, return <code>mid</code>.</li>
            <li>If the element at <code>mid</code> is less than the target, set <code>left</code> to <code>mid + 1</code>.</li>
            <li>Otherwise, set <code>right</code> to <code>mid - 1</code>.</li>
          </ul>
          <li>Return -1 if the target is not found.</li>
        </ol>
      </article>
      <CodeEditor />
    </div>
  );
}