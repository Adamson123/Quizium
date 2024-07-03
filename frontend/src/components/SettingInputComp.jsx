

const SettingInputComp = ({ input, setInput, type, name ,...rest }) => {
  const handleInput = (event) => {
    const name = event.target.name.split(" ").join("");
    setInput((i) => (i = { ...i, [name]: event.target.value }));
    console.log(name);
  };
  return (
    <>
      <span>
        {name[0].toLocaleUpperCase() + name.substring(1, name.length)}
      </span>
      <input
        value={input}
        onChange={handleInput}
        type={type}
        name={name}
       // disabled={type === "email" ? true : false}
        required
        {...rest}
        className={`
        px-3
        py-2 w-full
        text-textColor
        border-[2px]
        ${type === "email" ? "bg-grayTwo" : "bg-grayOne"}
        border-grayTwo
        outline-none rounded-[3px] 
        mt-3
        
        font-bold
        `}
      />
    </>
  );
};

export default SettingInputComp;
