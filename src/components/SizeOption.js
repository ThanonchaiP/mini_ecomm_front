const SizeOption = ({ size, setSize, selected }) => {
  const handleClick = (size) => {
    setSize(size);
  };

  return (
    <>
      <h1 className="mt-4 mb-2 font-semibold">SIZE</h1>
      <div className="flex gap-3">
        {size.map((s, idx) => (
          <button
            onClick={() => handleClick(s.size[0].title)}
            className={`py-1 transition border-2 border-black w-11 hover:bg-black hover:text-white ${selected === s.size[0].title && "selected"}`}
            key={idx}
          >
            {s.size[0].title}
          </button>
        ))}
      </div>
    </>
  );
};

export default SizeOption;
