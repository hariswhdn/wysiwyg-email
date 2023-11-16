function Field({
  label,
  type,
  name,
  placeholder,
  selectOption,
  title,
  title_x,
  title_y,
  min,
  max,
  defaultValue,
  value,
  checked,
  rows = 1,
  disabled,
  required,
  onBlur,
  onChange,
  tabIndex,
  children,
}) {
  const attr = {
    name: name,
    onBlur: onBlur,
    onChange: onChange,
    defaultValue: defaultValue,
    value: value,
    tabIndex: tabIndex,
    disabled: disabled,
    required: required,
  }
  return (
    <label data-title={title} data-title-x={title_x} data-title-y={title_y}>
      {label && <p>{label}</p>}
      {type === 'select' ? (
        <select {...attr}>
          {Object.keys(selectOption).map((item) => (
            <option key={item} value={item}>
              {selectOption[item]}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
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
