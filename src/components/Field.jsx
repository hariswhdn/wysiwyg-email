function Field({
  label,
  type,
  name,
  placeholder,
  value,
  checked,
  onChange,
  min,
  max,
  rows = 1,
  disabled,
  required,
  selectOption,
  children,
}) {
  const attr = {
    name: name,
    onChange: onChange,
    value: value,
    disabled: disabled,
    required: required,
  }
  return (
    <label>
      {label && <p>{label}</p>}
      {type === "select" ? (
        <select {...attr}>
          {Object.keys(selectOption).map((item) => (
            <option key={item} value={item}>
              {selectOption[item]}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea placeholder={placeholder} spellCheck="false" autoComplete="off" rows={rows} {...attr}></textarea>
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          min={min}
          max={max}
          checked={checked}
          spellCheck="false"
          autoComplete="off"
          {...attr}
        />
      )}
      {children?.length > 1 ? <div className="field_group">{children}</div> : children}
    </label>
  )
}

export default Field
