const SizeOption = ({ size, setSize, selected, setCurrentQty }) => {
  const handleClick = (size) => {
    setCurrentQty(size.qty);
    setSize(size.size[0].title);
  };

  return (
    <>
      <h1 className="mt-4 mb-2 font-semibold">SIZE</h1>
      <div className="flex gap-3">
        {size.map((s, idx) => (
          <button onClick={() => handleClick(s)} className={`p-1 transition border-2 border-black w-14 hover:bg-black hover:text-white ${selected === s.size[0].title && "selected"}`} key={idx}>
            {s.size[0].title}
          </button>
        ))}
      </div>
    </>
  );
};

export default SizeOption;
