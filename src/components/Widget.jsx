import React, {useState} from "react"
import Icon from "./Icon"
import Button from "./Button"
import Field from "./Field"

function WidgetGridCenter({widget, arrCounter, setArrCounter}) {
  const [expanded, setExpanded] = useState(true)

  return (
    <form action="?" id={`widget${widget.id}`} className="widget">
      <div className="widget_header">
        <div>
          <Button onClick={() => setExpanded(!expanded)}>
            <Icon icon={expanded ? "less" : "more"} />
          </Button>
          <p>#form{widget.id}</p>
        </div>
        <div className="field_group">
          {arrCounter.findIndex((item) => item.id === widget.id) !== 0 && (
            <Button
              onClick={() => {
                const idx = arrCounter.findIndex((item) => item.id === widget.id)
                if (idx > 0) {
                  setArrCounter([...moveArrItem(arrCounter, idx, "backward")])
                }
              }}>
              <Icon icon="up" />
            </Button>
          )}
          {arrCounter.findIndex((item) => item.id === widget.id) !== arrCounter.length - 1 && (
            <Button
              onClick={() => {
                const idx = arrCounter.findIndex((item) => item.id === widget.id)
                if (idx > -1 && idx < arrCounter.length - 1) {
                  setArrCounter([...moveArrItem(arrCounter, idx, "forward")])
                }
              }}>
              <Icon icon="down" />
            </Button>
          )}
          <Button
            onClick={() =>
              setArrCounter(
                arrCounter.filter(function (item) {
                  return item.id !== widget.id
                })
              )
            }>
            <Icon icon="delete" />
          </Button>
        </div>
      </div>
      {expanded && (
        <fieldset className="widget_body">
          <div>
            <Field
              type="textarea"
              name="title"
              placeholder="Heading"
              value={widget.title}
              onChange={(e) =>
                setArrCounter(
                  arrCounter.map((item) => (item.id !== widget.id ? item : {...item, title: e.target.value}))
                )
              }
            />
            <div className="field_group">
              <Field
                type="checkbox"
                name="text_bold"
                disabled={widget.title.length === 0}
                checked={widget.title_bold}
                onChange={(e) =>
                  setArrCounter(
                    arrCounter.map((item) => (item.id !== widget.id ? item : {...item, title_bold: e.target.checked}))
                  )
                }>
                <Icon icon="bold" />
              </Field>
              <Field
                type="checkbox"
                name="text_italic"
                disabled={widget.title.length === 0}
                checked={widget.title_italic}
                onChange={(e) =>
                  setArrCounter(
                    arrCounter.map((item) => (item.id !== widget.id ? item : {...item, title_italic: e.target.checked}))
                  )
                }>
                <Icon icon="italic" />
              </Field>
            </div>
          </div>
          <div>
            <Field
              type="textarea"
              name="description"
              placeholder="Subheading"
              value={widget.description}
              onChange={(e) =>
                setArrCounter(
                  arrCounter.map((item) => (item.id !== widget.id ? item : {...item, description: e.target.value}))
                )
              }
            />
            <div className="field_group">
              <Field
                type="checkbox"
                name="text_bold"
                disabled={widget.description.length === 0}
                checked={widget.description_bold}
                onChange={(e) =>
                  setArrCounter(
                    arrCounter.map((item) =>
                      item.id !== widget.id ? item : {...item, description_bold: e.target.checked}
                    )
                  )
                }>
                <Icon icon="bold" />
              </Field>
              <Field
                type="checkbox"
                name="text_italic"
                disabled={widget.description.length === 0}
                checked={widget.description_italic}
                onChange={(e) =>
                  setArrCounter(
                    arrCounter.map((item) =>
                      item.id !== widget.id ? item : {...item, description_italic: e.target.checked}
                    )
                  )
                }>
                <Icon icon="italic" />
              </Field>
            </div>
          </div>
          <div>
            <Field
              label="Column"
              type="number"
              name="column"
              placeholder="0"
              value={widget.columns.length}
              min={0}
              max={12}
              onChange={(e) => {
                const val = parseInt(e.target.value || "0")
                if (val !== widget.columns.length && val >= 0 && val <= 12) {
                  setArrCounter(
                    arrCounter.map((item) => {
                      if (item.id === widget.id) {
                        let willColumns = widget.columns
                        if (willColumns.length > val) {
                          willColumns.length = val
                        } else if (willColumns.length < val) {
                          const willColumnsLength = willColumns.length
                          for (let i = 0; i < val - willColumnsLength; i++) {
                            willColumns.push({
                              ...objColumn,
                              id: willColumnsLength + (i + 1),
                              icon: Object.keys(objIconSocial)[willColumnsLength + i],
                              text: objIconSocial[Object.keys(objIconSocial)[willColumnsLength + i]],
                            })
                          }
                        }
                        item = {...item, columns: willColumns}
                      }
                      return item
                    })
                  )
                }
              }}>
              <Button
                onClick={() => {
                  if (widget.columns.length > 0) {
                    setArrCounter(
                      arrCounter.map((item) => {
                        if (item.id === widget.id) {
                          item.columns.length = item.columns.length - 1
                        }
                        return item
                      })
                    )
                  }
                }}
                disabled={widget.columns.length === 0}>
                <Icon icon="subtract" />
              </Button>
              <Button
                onClick={() => {
                  if (widget.columns.length < 12) {
                    setArrCounter(
                      arrCounter.map((item) => {
                        if (item.id === widget.id) {
                          item.columns.push({
                            ...objColumn,
                            id: item.columns.length + 1,
                            icon: Object.keys(objIconSocial)[item.columns.length],
                            text: objIconSocial[Object.keys(objIconSocial)[item.columns.length]],
                          })
                        }
                        return item
                      })
                    )
                  }
                }}
                disabled={widget.columns.length === 12}>
                <Icon icon="add" />
              </Button>
            </Field>
            <Field
              label="Text size"
              type="text"
              name="text_size"
              placeholder="M"
              value={arrFontSize[widget.idx_font_size].name}
              // onChange={(e) => {
              //   let val = parseInt(e.target.value || "0")
              //   if (val < 0 || val > arrFontSize.length - 1) {
              //     val = 1
              //   }
              //   if (val !== widget.idx_font_size) {
              //     setArrCounter(
              //       arrCounter.map((item) => (item.id !== widget.id ? item : {...item, idx_font_size: val}))
              //     )
              //   }
              // }}
              disabled={true}>
              <Button
                onClick={() =>
                  widget.idx_font_size > 1 &&
                  setArrCounter(
                    arrCounter.map((item) =>
                      item.id !== widget.id
                        ? item
                        : {
                            ...item,
                            idx_font_size: widget.idx_font_size - 1,
                          }
                    )
                  )
                }
                disabled={widget.idx_font_size === 1}>
                <Icon icon="subtract" />
              </Button>
              <Button
                onClick={() =>
                  widget.idx_font_size < 4 &&
                  setArrCounter(
                    arrCounter.map((item) =>
                      item.id !== widget.id
                        ? item
                        : {
                            ...item,
                            idx_font_size: widget.idx_font_size + 1,
                          }
                    )
                  )
                }
                disabled={widget.idx_font_size === 4}>
                <Icon icon="add" />
              </Button>
            </Field>
          </div>
          <div>
            {/* <div> */}
            <Field
              label="Icon"
              type="checkbox"
              name="icon"
              checked={widget.icon}
              onChange={(e) =>
                setArrCounter(
                  arrCounter.map((item) => (item.id !== widget.id ? item : {...item, icon: e.target.checked}))
                )
              }
            />
            {/* <Field
                label="Circled"
                type="checkbox"
                name="icon_circled"
                checked={widget.icon_circled}
                disabled={!widget.icon}
                onChange={(e) =>
                  setArrCounter(
                    arrCounter.map((item) => (item.id !== widget.id ? item : {...item, icon_circled: e.target.checked}))
                  )
                }
              /> */}
            {/* </div> */}
            <div className="field_group">
              <Field
                type="checkbox"
                name="icon_order"
                checked={widget.icon_order}
                onChange={(e) =>
                  setArrCounter(
                    arrCounter.map((item) => (item.id !== widget.id ? item : {...item, icon_order: e.target.checked}))
                  )
                }>
                <Icon icon="list_order" />
              </Field>
              <Field
                type="checkbox"
                name="icon_circled"
                checked={widget.icon_circled}
                onChange={(e) =>
                  setArrCounter(
                    arrCounter.map((item) => (item.id !== widget.id ? item : {...item, icon_circled: e.target.checked}))
                  )
                }>
                <Icon icon="circle" />
              </Field>
            </div>
            <div className="field_group">
              <Field
                type="checkbox"
                name="text_bold"
                checked={widget.columns_bold}
                onChange={(e) =>
                  setArrCounter(
                    arrCounter.map((item) => (item.id !== widget.id ? item : {...item, columns_bold: e.target.checked}))
                  )
                }>
                <Icon icon="bold" />
              </Field>
              <Field
                type="checkbox"
                name="text_italic"
                checked={widget.columns_italic}
                onChange={(e) =>
                  setArrCounter(
                    arrCounter.map((item) =>
                      item.id !== widget.id ? item : {...item, columns_italic: e.target.checked}
                    )
                  )
                }>
                <Icon icon="italic" />
              </Field>
            </div>
            <div className="field_group">
              <Field
                type="checkbox"
                name="columns_align_x"
                checked={widget.columns_align_x === "left"}
                onChange={() =>
                  setArrCounter(
                    arrCounter.map((item) =>
                      item.id !== widget.id
                        ? item
                        : {...item, columns_align_x: item.columns_align_x !== "left" ? "left" : "center"}
                    )
                  )
                }>
                <Icon icon="align_left" />
              </Field>
              <Field
                type="checkbox"
                name="columns_align_x"
                checked={widget.columns_align_x === "right"}
                onChange={() =>
                  setArrCounter(
                    arrCounter.map((item) =>
                      item.id !== widget.id
                        ? item
                        : {
                            ...item,
                            columns_align_x: item.columns_align_x !== "right" ? "right" : "center",
                          }
                    )
                  )
                }>
                <Icon icon="align_right" />
              </Field>
              <Field
                type="checkbox"
                name="columns_align_top"
                checked={widget.columns_align_top}
                onChange={(e) =>
                  setArrCounter(
                    arrCounter.map((item) =>
                      item.id !== widget.id ? item : {...item, columns_align_top: e.target.checked}
                    )
                  )
                }>
                <Icon icon="align_top" />
              </Field>
              <Field
                type="checkbox"
                name="columns_break"
                checked={widget.columns_break}
                onChange={(e) =>
                  setArrCounter(
                    arrCounter.map((item) =>
                      item.id !== widget.id ? item : {...item, columns_break: e.target.checked}
                    )
                  )
                }>
                <Icon icon="corner_down_left" />
              </Field>
            </div>
          </div>
        </fieldset>
      )}
      {expanded && (
        <fieldset className="widget_columns">
          {widget.columns.map((item) => (
            <div key={item.id}>
              <div className="field_group">
                <Field
                  type="textarea"
                  name="text"
                  placeholder="Text"
                  value={item.text}
                  onChange={(e) =>
                    setArrCounter(
                      arrCounter.map((item1) => {
                        if (item1.id === widget.id) {
                          item1.columns.map((item2) => {
                            if (item2.id === item.id) {
                              item2.text = e.target.value
                            }
                            return item2
                          })
                        }
                        return item1
                      })
                    )
                  }
                />
                <Field
                  type="checkbox"
                  name="columns_align_top"
                  checked={item.columns_align_top}
                  disabled={!widget.icon || widget.columns_break}
                  onChange={(e) =>
                    setArrCounter(
                      arrCounter.map((item1) => {
                        if (item1.id === widget.id) {
                          item1.columns.map((item2) => {
                            if (item2.id === item.id) {
                              item2.columns_align_top = e.target.checked
                            }
                            return item2
                          })
                        }
                        return item1
                      })
                    )
                  }>
                  <Icon icon="align_top" />
                </Field>
              </div>
              <div className="field_group">
                <Field
                  type="select"
                  name="icon"
                  selectOption={objIconSocial}
                  value={item.icon}
                  disabled={!widget.icon}
                  required={true}
                  onChange={(e) =>
                    setArrCounter(
                      arrCounter.map((item1) => {
                        if (item1.id === widget.id) {
                          item1.columns.map((item2) => {
                            if (item2.id === item.id) {
                              item2.icon = e.target.value
                            }
                            return item2
                          })
                        }
                        return item1
                      })
                    )
                  }
                />
                <Field
                  type="url"
                  name="url"
                  placeholder="URL"
                  value={item.url}
                  onChange={(e) =>
                    setArrCounter(
                      arrCounter.map((item1) => {
                        if (item1.id === widget.id) {
                          item1.columns.map((item2) => {
                            if (item2.id === item.id) {
                              item2.url = e.target.value
                            }
                            return item2
                          })
                        }
                        return item1
                      })
                    )
                  }
                />
              </div>
            </div>
          ))}
        </fieldset>
      )}
    </form>
  )
}

const arrFontSize = [
  {font_size: 12, line_height: 16, name: "XS"},
  {font_size: 14, line_height: 20, name: "S"},
  {font_size: 16, line_height: 24, name: "M"},
  {font_size: 18, line_height: 28, name: "L"},
  {font_size: 20, line_height: 28, name: "LG"},
  {font_size: 24, line_height: 32, name: "XL"},
]

const objIconSocial = {
  appstore: "App Store",
  behance: "Behance",
  email: "Email",
  github: "GitHub",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  medium: "Medium",
  patreon: "patreon",
  playstore: "Play Store",
  spotify: "Spotify",
  steam: "Steam",
  twitter: "Twitter",
  website: "Website",
  whatsapp: "WhatsApp",
  youtube: "YouTube",
}

const objColumn = {
  id: 1,
  icon: Object.keys(objIconSocial)[1],
  text: objIconSocial[Object.keys(objIconSocial)[1]],
  url: "https://localhost",
  columns_align_top: false,
  columns_break: false,
}

function moveArrItem(arr, idx, type) {
  const temp = arr[idx]
  arr[idx] = arr[type === "forward" ? idx + 1 : idx - 1]
  arr[type === "forward" ? idx + 1 : idx - 1] = temp
  return arr
}

export {WidgetGridCenter, arrFontSize, objIconSocial}
