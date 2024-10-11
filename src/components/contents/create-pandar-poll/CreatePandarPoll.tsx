const CreatePandarPoll: React.FC = () => {
  return (
    <div className="border rounded-lg p-6 bg-neutral-100 shadow-md my-4">
      <h2 className="text-lg font-bold mb-4">Create a New Poll</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Poll Question</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter your poll question"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Options</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md mb-2"
            placeholder="Option 1"
          />
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md mb-2"
            placeholder="Option 2"
          />
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md mb-2"
            placeholder="Option 3"
          />
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Option 4"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-gradient-to-r from-secondary-100 to-tertiary-100 text-white rounded-md"
        >
          Create Poll
        </button>
      </form>
    </div>
  )
}

export default CreatePandarPoll