function CheckTypeCreate() {
  return (
    <fieldset className=" my-2">
      <legend className="mb-2 font-medium">မြင်သာမှု</legend>
      <div className="flex flex-wrap gap-2">
        {["အများ", "သီးသန့်"].map((check, i) => (
          <label key={check} className="cursor-pointer">
            <input
              type="radio"
              name="typeCheck"
              value={check}
              defaultChecked={i === 0}
              className="sr-only peer"
            />
            <div className="px-4 py-2 rounded-lg border-2 border-borderFull transition-colors duration-300  font-medium peer-checked:bg-brand peer-checked:text-foreground">
              {check}
            </div>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default CheckTypeCreate;
