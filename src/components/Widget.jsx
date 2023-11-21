import React, {useState} from 'react'
import Icon from './Icon'
import Button from './Button'
import Field from './Field'

function WidgetGridCenter({widget, arrCounter, setArrCounter}) {
  const [expanded, setExpanded] = useState(true)

  function onChangeTextarea(e) {
    const el_rows = 9
    const el_padding = 12
    const el_lineHeight = 16
    const el_border = 2
    let el = e.target
    if ((el.scrollHeight - el_padding) / el_lineHeight <= el_rows) {
      el.style.height = 'auto'
      el.style.height = el.scrollHeight + el_border + 'px'
    } else {
      el.style.height = el.offsetHeight + 'px'
    }
  }

  return (
    <form action="?" id={`widget${widget.id}`} className="widget">
      <div className="widget_header">
        <div>
          <Button title={(expanded ? 'Collapse' : 'Expand') + ' widget'} onClick={() => setExpanded(!expanded)}>
            <Icon icon={expanded ? 'less' : 'more'} />
          </Button>
          <p>#widget{widget.id}</p>
        </div>
        <div className="field_group">
          {arrCounter.findIndex((item) => item.id === widget.id) !== 0 && (
            <Button
              title="Push widget up"
              title_x="r"
              onClick={() => {
                const idx = arrCounter.findIndex((item) => item.id === widget.id)
                if (idx > 0) {
                  setArrCounter([...moveArrItem(arrCounter, idx, 'backward')])
                }
              }}>
              <Icon icon="up" />
            </Button>
          )}
          {arrCounter.findIndex((item) => item.id === widget.id) !== arrCounter.length - 1 && (
            <Button
              title="Push widget down"
              title_x="r"
              onClick={() => {
                const idx = arrCounter.findIndex((item) => item.id === widget.id)
                if (idx > -1 && idx < arrCounter.length - 1) {
                  setArrCounter([...moveArrItem(arrCounter, idx, 'forward')])
                }
              }}>
              <Icon icon="down" />
            </Button>
          )}
          <Button
            title="Delete widget"
            title_x="r"
            onClick={() => {
              if (confirm("Deleted widget can't undo, continue?")) {
                setArrCounter(
                  arrCounter.filter(function (item) {
                    return item.id !== widget.id
                  })
                )
              }
            }}>
            <Icon icon="delete" />
          </Button>
        </div>
      </div>
      {expanded && (
        <fieldset className="widget_body">
          <div>
            <Field
              tabIndex={-1}
              label="Text size"
              type="text"
              placeholder="M"
              value={arrFontSize[widget.idx_font_size].name}
              disabled={true}>
              <Button
                title="Decrease text size"
                disabled={
                  widget.idx_font_size === 0 ||
                  (widget.columns.length === 0 && widget.title.length === 0 && widget.description.length === 0)
                }
                onClick={() =>
                  widget.idx_font_size > 0 &&
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
                }>
                <Icon icon="subtract" />
              </Button>
              <Button
                title="Increase text size"
                disabled={
                  widget.idx_font_size === 4 ||
                  (widget.columns.length === 0 && widget.title.length === 0 && widget.description.length === 0)
                }
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
                }>
                <Icon icon="add" />
              </Button>
            </Field>
            <div className="field_group">
              <Field
                type="checkbox"
                title={(widget.dark_mode ? 'Light' : 'Dark') + ' color scheme'}
                title_x="r"
                checked={widget.dark_mode}
                disabled={widget.columns.length === 0 && widget.title.length === 0 && widget.description.length === 0}
                onChange={(e) => {
                  if (confirm('Set to dark/light color will override all current color in widget, continue?')) {
                    const obj = {
                      dark_mode: e.target.checked,
                      title_color: e.target.checked ? '#EEEEEE' : '#202020',
                      description_color: e.target.checked ? '#B4B4B4' : '#646464',
                      icon_order_color: e.target.checked ? '#EEEEEE' : '#646464',
                      columns_color: e.target.checked ? '#EEEEEE' : '#202020',
                      background_color: e.target.checked ? '#191919' : '#FCFCFC',
                      icon_boxed_color: e.target.checked ? '#222222' : '#F9F9F9',
                      icon_boxed_border_color: e.target.checked ? '#313131' : '#E8E8E8',
                      icon_circled_color: e.target.checked ? '#313131' : '#F0F0F0',
                      icon_circled_border_color: e.target.checked ? '#3A3A3A' : '#E0E0E0',
                    }
                    setArrCounter(
                      arrCounter.map((item) =>
                        item.id !== widget.id
                          ? item
                          : {
                              ...item,
                              ...obj,
                            }
                      )
                    )
                    const el_form = document.getElementById('widget' + widget.id)
                    el_form.querySelector('[name="title_color"]').value = obj.title_color
                    el_form.querySelector('[name="description_color"]').value = obj.description_color
                    el_form.querySelector('[name="icon_order_color"]').value = obj.icon_order_color
                    el_form.querySelector('[name="columns_color"]').value = obj.columns_color
                    el_form.querySelector('[name="background_color"]').value = obj.background_color
                    el_form.querySelector('[name="icon_boxed_color"]').value = obj.icon_boxed_color
                    el_form.querySelector('[name="icon_boxed_border_color"]').value = obj.icon_boxed_border_color
                    el_form.querySelector('[name="icon_circled_color"]').value = obj.icon_circled_color
                    el_form.querySelector('[name="icon_circled_border_color"]').value = obj.icon_circled_border_color
                  }
                }}>
                <Icon icon="dark_mode" />
              </Field>
              <Field
                type="color"
                name="background_color"
                title="Background color"
                title_x="r"
                defaultValue={widget.background_color}
                disabled={widget.columns.length === 0 && widget.title.length === 0 && widget.description.length === 0}
                onBlur={(e) =>
                  setArrCounter(
                    arrCounter.map((item) =>
                      item.id !== widget.id ? item : {...item, background_color: e.target.value}
                    )
                  )
                }
              />
            </div>
          </div>
          <div data-line="t" data-line-t-title="Spaces">
            <div>
              <Field
                tabIndex={-1}
                label="Top"
                type="text"
                placeholder="Full"
                value={arrPadding[widget.idx_padding_top].name}
                disabled={true}>
                <Button
                  title="Decrease top space"
                  disabled={
                    widget.idx_padding_top === 0 ||
                    (widget.columns.length === 0 && widget.title.length === 0 && widget.description.length === 0)
                  }
                  onClick={() =>
                    widget.idx_padding_top > 0 &&
                    setArrCounter(
                      arrCounter.map((item) =>
                        item.id !== widget.id
                          ? item
                          : {
                              ...item,
                              idx_padding_top: widget.idx_padding_top - 1,
                            }
                      )
                    )
                  }>
                  <Icon icon="subtract" />
                </Button>
                <Button
                  title="Increase top space"
                  disabled={
                    widget.idx_padding_top === 6 ||
                    (widget.columns.length === 0 && widget.title.length === 0 && widget.description.length === 0)
                  }
                  onClick={() =>
                    widget.idx_padding_top < 6 &&
                    setArrCounter(
                      arrCounter.map((item) =>
                        item.id !== widget.id
                          ? item
                          : {
                              ...item,
                              idx_padding_top: widget.idx_padding_top + 1,
                            }
                      )
                    )
                  }>
                  <Icon icon="add" />
                </Button>
              </Field>
              <Field
                tabIndex={-1}
                label="Bottom"
                type="text"
                placeholder="Full"
                value={arrPadding[widget.idx_padding_bottom].name}
                disabled={true}>
                <Button
                  title="Decrease bottom space"
                  disabled={
                    widget.idx_padding_bottom === 0 ||
                    (widget.columns.length === 0 && widget.title.length === 0 && widget.description.length === 0)
                  }
                  onClick={() =>
                    widget.idx_padding_bottom > 0 &&
                    setArrCounter(
                      arrCounter.map((item) =>
                        item.id !== widget.id
                          ? item
                          : {
                              ...item,
                              idx_padding_bottom: widget.idx_padding_bottom - 1,
                            }
                      )
                    )
                  }>
                  <Icon icon="subtract" />
                </Button>
                <Button
                  title="Increase bottom space"
                  title_x="r"
                  disabled={
                    widget.idx_padding_bottom === 6 ||
                    (widget.columns.length === 0 && widget.title.length === 0 && widget.description.length === 0)
                  }
                  onClick={() =>
                    widget.idx_padding_bottom < 6 &&
                    setArrCounter(
                      arrCounter.map((item) =>
                        item.id !== widget.id
                          ? item
                          : {
                              ...item,
                              idx_padding_bottom: widget.idx_padding_bottom + 1,
                            }
                      )
                    )
                  }>
                  <Icon icon="add" />
                </Button>
              </Field>
            </div>
          </div>
          <div className="field_group">
            <Field
              type="textarea"
              placeholder="Title"
              value={widget.title}
              onChange={(e) => {
                onChangeTextarea(e)
                setArrCounter(
                  arrCounter.map((item) => (item.id !== widget.id ? item : {...item, title: e.target.value}))
                )
              }}
            />
            <Field
              type="checkbox"
              title="Bold title"
              title_x="r"
              checked={widget.title_bold}
              disabled={widget.title.length === 0}
              onChange={(e) =>
                setArrCounter(
                  arrCounter.map((item) => (item.id !== widget.id ? item : {...item, title_bold: e.target.checked}))
                )
              }>
              <Icon icon="bold" />
            </Field>
            <Field
              type="color"
              title="Color title"
              title_x="r"
              name="title_color"
              defaultValue={widget.title_color}
              disabled={widget.title.length === 0}
              onBlur={(e) =>
                setArrCounter(
                  arrCounter.map((item) => (item.id !== widget.id ? item : {...item, title_color: e.target.value}))
                )
              }
            />
          </div>
          <div className="field_group">
            <Field
              type="textarea"
              placeholder="Description"
              value={widget.description}
              onChange={(e) => {
                onChangeTextarea(e)
                setArrCounter(
                  arrCounter.map((item) => (item.id !== widget.id ? item : {...item, description: e.target.value}))
                )
              }}
            />
            <Field
              type="checkbox"
              title="Bold description"
              title_x="r"
              checked={widget.description_bold}
              disabled={widget.description.length === 0}
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
              type="color"
              name="description_color"
              title="Color description"
              title_x="r"
              defaultValue={widget.description_color}
              disabled={widget.description.length === 0}
              onBlur={(e) =>
                setArrCounter(
                  arrCounter.map((item) =>
                    item.id !== widget.id ? item : {...item, description_color: e.target.value}
                  )
                )
              }
            />
          </div>
          <div data-line="t" data-line-t-title="Columns">
            <div>
              <Field
                tabIndex={-1}
                label="Column"
                type="number"
                placeholder="0"
                min={0}
                max={9}
                value={widget.columns.length}
                onChange={(e) => {
                  const val = parseInt(e.target.value || '0')
                  if (val !== widget.columns.length && val >= 0 && val <= 9) {
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
                  title="Decrease column"
                  disabled={widget.columns.length === 0}
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
                  }}>
                  <Icon icon="subtract" />
                </Button>
                <Button
                  title="Increase column"
                  disabled={widget.columns.length === 9}
                  onClick={() => {
                    if (widget.columns.length < 9) {
                      setArrCounter(
                        arrCounter.map((item) => {
                          if (item.id === widget.id) {
                            let willId = item.columns.length + 1
                            for (let i = 0; i < 9; i++) {
                              if (item.columns.findIndex((x) => x.id === i + 1) === -1) {
                                willId = i + 1
                              }
                            }
                            item.columns.push({
                              ...objColumn,
                              id: willId,
                              icon: Object.keys(objIconSocial)[item.columns.length],
                              text: objIconSocial[Object.keys(objIconSocial)[item.columns.length]],
                            })
                          }
                          return item
                        })
                      )
                    }
                  }}>
                  <Icon icon="add" />
                </Button>
              </Field>
              <div className="field_group">
                <Field
                  type="checkbox"
                  title="Align left column"
                  title_x="r"
                  checked={widget.columns_align_x === 'left'}
                  disabled={widget.columns.length === 0}
                  onChange={() =>
                    setArrCounter(
                      arrCounter.map((item) =>
                        item.id !== widget.id
                          ? item
                          : {...item, columns_align_x: item.columns_align_x !== 'left' ? 'left' : 'center'}
                      )
                    )
                  }>
                  <Icon icon="skip_left" />
                </Field>
                <Field
                  type="checkbox"
                  title="Align right column"
                  title_x="r"
                  checked={widget.columns_align_x === 'right'}
                  disabled={widget.columns.length === 0}
                  onChange={() =>
                    setArrCounter(
                      arrCounter.map((item) =>
                        item.id !== widget.id
                          ? item
                          : {
                              ...item,
                              columns_align_x: item.columns_align_x !== 'right' ? 'right' : 'center',
                            }
                      )
                    )
                  }>
                  <Icon icon="skip_right" />
                </Field>
              </div>
              <Field
                type="checkbox"
                title="Align top column"
                title_x="r"
                checked={widget.columns_align_top}
                disabled={widget.columns.length === 0}
                onChange={(e) =>
                  setArrCounter(
                    arrCounter.map((item) =>
                      item.id !== widget.id ? item : {...item, columns_align_top: e.target.checked}
                    )
                  )
                }>
                <Icon icon="skip_top" />
              </Field>
            </div>
            <div>
              <div className="field_group">
                <Field
                  type="checkbox"
                  title="Bold column"
                  checked={widget.columns_bold}
                  disabled={widget.columns.length === 0 || widget.columns.every((item) => item.text.length === 0)}
                  onChange={(e) =>
                    setArrCounter(
                      arrCounter.map((item) =>
                        item.id !== widget.id ? item : {...item, columns_bold: e.target.checked}
                      )
                    )
                  }>
                  <Icon icon="bold" />
                </Field>
                <Field
                  type="color"
                  name="columns_color"
                  title="Color column"
                  defaultValue={widget.columns_color}
                  disabled={widget.columns.length === 0 || widget.columns.every((item) => item.text.length === 0)}
                  onBlur={(e) =>
                    setArrCounter(
                      arrCounter.map((item) =>
                        item.id !== widget.id ? item : {...item, columns_color: e.target.value}
                      )
                    )
                  }
                />
              </div>
              <div className="field_group">
                <Field
                  type="checkbox"
                  title="Boxed column"
                  checked={widget.icon_boxed}
                  disabled={widget.columns.length === 0}
                  onChange={(e) =>
                    setArrCounter(
                      arrCounter.map((item) => (item.id !== widget.id ? item : {...item, icon_boxed: e.target.checked}))
                    )
                  }>
                  <Icon icon="rectangle" />
                </Field>
                <Field
                  type="color"
                  name="icon_boxed_color"
                  title="Box color column"
                  defaultValue={widget.icon_boxed_color}
                  disabled={widget.columns.length === 0 || !widget.icon_boxed}
                  onBlur={(e) =>
                    setArrCounter(
                      arrCounter.map((item) =>
                        item.id !== widget.id ? item : {...item, icon_boxed_color: e.target.value}
                      )
                    )
                  }
                />
                <Field
                  type="checkbox"
                  title="Bordered column"
                  title_x="r"
                  checked={widget.icon_boxed_border}
                  disabled={widget.columns.length === 0}
                  onChange={(e) =>
                    setArrCounter(
                      arrCounter.map((item) =>
                        item.id !== widget.id ? item : {...item, icon_boxed_border: e.target.checked}
                      )
                    )
                  }>
                  <Icon icon="rectangle_border" />
                </Field>
                <Field
                  type="color"
                  name="icon_boxed_border_color"
                  title="Border color column"
                  title_x="r"
                  defaultValue={widget.icon_boxed_border_color}
                  disabled={widget.columns.length === 0 || !widget.icon_boxed_border}
                  onBlur={(e) =>
                    setArrCounter(
                      arrCounter.map((item) =>
                        item.id !== widget.id ? item : {...item, icon_boxed_border_color: e.target.value}
                      )
                    )
                  }
                />
              </div>
            </div>
          </div>
          <div data-line="t" data-line-t-title="Icons">
            <Field
              label="Icon"
              type="checkbox"
              title={(widget.icon ? 'Without' : 'With') + ' icon'}
              title_y="t"
              checked={widget.icon}
              disabled={widget.columns.length === 0}
              onChange={(e) =>
                setArrCounter(
                  arrCounter.map((item) => (item.id !== widget.id ? item : {...item, icon: e.target.checked}))
                )
              }
            />
            <div className="field_group">
              <Field
                type="checkbox"
                title="Number as icon"
                title_y="t"
                checked={widget.icon_order}
                disabled={widget.columns.length === 0 || !widget.icon}
                onChange={(e) =>
                  setArrCounter(
                    arrCounter.map((item) => (item.id !== widget.id ? item : {...item, icon_order: e.target.checked}))
                  )
                }>
                <Icon icon="list_order" />
              </Field>
              <Field
                type="color"
                name="icon_order_color"
                title="Number color"
                title_y="t"
                defaultValue={widget.icon_order_color}
                disabled={widget.columns.length === 0 || !widget.icon || !widget.icon_order}
                onBlur={(e) =>
                  setArrCounter(
                    arrCounter.map((item) =>
                      item.id !== widget.id ? item : {...item, icon_order_color: e.target.value}
                    )
                  )
                }
              />
            </div>
            <div className="field_group">
              <Field
                type="checkbox"
                title="Circled icon"
                title_y="t"
                checked={widget.icon_circled}
                disabled={widget.columns.length === 0 || !widget.icon}
                onChange={(e) =>
                  setArrCounter(
                    arrCounter.map((item) => (item.id !== widget.id ? item : {...item, icon_circled: e.target.checked}))
                  )
                }>
                <Icon icon="circle" />
              </Field>
              <Field
                type="color"
                name="icon_circled_color"
                title="Circle color icon"
                title_x="r"
                title_y="t"
                defaultValue={widget.icon_circled_color}
                disabled={widget.columns.length === 0 || !widget.icon || !widget.icon_circled}
                onBlur={(e) =>
                  setArrCounter(
                    arrCounter.map((item) =>
                      item.id !== widget.id ? item : {...item, icon_circled_color: e.target.value}
                    )
                  )
                }
              />
              <Field
                type="checkbox"
                title="Bordered icon"
                title_x="r"
                title_y="t"
                checked={widget.icon_circled_border}
                disabled={widget.columns.length === 0 || !widget.icon}
                onChange={(e) =>
                  setArrCounter(
                    arrCounter.map((item) =>
                      item.id !== widget.id ? item : {...item, icon_circled_border: e.target.checked}
                    )
                  )
                }>
                <Icon icon="circle_border" />
              </Field>
              <Field
                type="color"
                name="icon_circled_border_color"
                title="Border color icon"
                title_x="r"
                title_y="t"
                defaultValue={widget.icon_circled_border_color}
                disabled={widget.columns.length === 0 || !widget.icon || !widget.icon_circled_border}
                onBlur={(e) =>
                  setArrCounter(
                    arrCounter.map((item) =>
                      item.id !== widget.id ? item : {...item, icon_circled_border_color: e.target.value}
                    )
                  )
                }
              />
            </div>
            <Field
              type="checkbox"
              title="Line break icon"
              title_x="r"
              title_y="t"
              checked={widget.columns_break}
              disabled={widget.columns.length === 0 || !widget.icon}
              onChange={(e) =>
                setArrCounter(
                  arrCounter.map((item) => (item.id !== widget.id ? item : {...item, columns_break: e.target.checked}))
                )
              }>
              <Icon icon="corner_down_left" />
            </Field>
          </div>
        </fieldset>
      )}
      {expanded && widget.columns.length > 0 && (
        <fieldset className="widget_columns">
          {widget.columns.map((item) => (
            <div key={item.id}>
              <div className="field_group">
                <Field
                  type="textarea"
                  placeholder="Text"
                  value={item.text}
                  onChange={(e) => {
                    onChangeTextarea(e)
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
                  }}
                />
                <Field
                  type="checkbox"
                  title="Align top item"
                  title_x="r"
                  title_y="t"
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
                  <Icon icon="skip_top" />
                </Field>
                <Button
                  title="Delete column"
                  title_x="r"
                  title_y="t"
                  onClick={() => {
                    setArrCounter(
                      arrCounter.map((item1) => {
                        if (item1.id === widget.id) {
                          let idx = -1
                          item1.columns.map((item2, index) => {
                            if (item2.id === item.id) {
                              idx = index
                            }
                            return item2
                          })
                          if (idx > -1) {
                            item1.columns.splice(idx, 1)
                          }
                        }
                        return item1
                      })
                    )
                  }}>
                  <Icon icon="delete" />
                </Button>
              </div>
              <div className="field_group">
                <Field
                  type="select"
                  selectOption={objIconSocial}
                  title="Select icon"
                  title_y="t"
                  value={item.icon}
                  disabled={!widget.icon || widget.icon_order}
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
  {font_size: 12, line_height: 16, name: 'S'},
  {font_size: 14, line_height: 20, name: 'M'},
  {font_size: 16, line_height: 24, name: 'L'},
  {font_size: 18, line_height: 28, name: 'LG'},
  {font_size: 20, line_height: 28, name: 'XL'},
  {font_size: 24, line_height: 32, name: 'XXL'},
]

const arrPadding = [
  {fraction: 0, name: '0'},
  {fraction: 0.25, name: '0.25'},
  {fraction: 0.5, name: '0.5'},
  {fraction: 1, name: '1'},
  {fraction: 1.25, name: '1.25'},
  {fraction: 1.5, name: '1.5'},
  {fraction: 2, name: '2'},
]

const objIconSocial = {
  appstore: 'App Store',
  behance: 'Behance',
  email: 'Email',
  github: 'GitHub',
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  medium: 'Medium',
  patreon: 'Patreon',
  playstore: 'Play Store',
  spotify: 'Spotify',
  steam: 'Steam',
  twitter: 'Twitter',
  website: 'Website',
  whatsapp: 'WhatsApp',
  youtube: 'YouTube',
}

const objColumn = {
  id: 1,
  icon: Object.keys(objIconSocial)[1],
  text: objIconSocial[Object.keys(objIconSocial)[1]],
  url: 'https://localhost',
  columns_align_top: false,
  columns_break: false,
}

function moveArrItem(arr, idx, type) {
  const temp = arr[idx]
  arr[idx] = arr[type === 'forward' ? idx + 1 : idx - 1]
  arr[type === 'forward' ? idx + 1 : idx - 1] = temp
  return arr
}

export {WidgetGridCenter, arrFontSize, arrPadding, objIconSocial}
