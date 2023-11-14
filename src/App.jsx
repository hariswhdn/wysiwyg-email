import React, {useEffect, useState} from 'react'
import Icon from './components/Icon'
import Button from './components/Button'
import {WidgetGridCenter, arrFontSize} from './components/Widget'
import DOMPurify from 'dompurify'

const objWidget = {
  id: 1,
  type: 'grid_center',
  title: '',
  title_bold: false,
  title_italic: false,
  description: '',
  description_bold: false,
  description_italic: false,
  idx_font_size: 2,
  icon: true,
  icon_order: false,
  icon_circled: true,
  columns: [],
  columns_bold: false,
  columns_italic: false,
  columns_align_top: false,
  columns_align_x: 'center',
  columns_break: false,
}

function App() {
  const [counter, setCounter] = useState(0)
  const [arrCounter, setArrCounter] = useState([])

  useEffect(() => {
    console.log('arrCounter', arrCounter)
  }, [arrCounter])

  function addWidget() {
    if (arrCounter.length < 12) {
      const willCounter = counter + 1
      setCounter(willCounter)
      setArrCounter([{...JSON.parse(JSON.stringify(objWidget)), id: willCounter}, ...arrCounter])
    }
  }

  return (
    <>
      {/* <header>
        <h1>Lorem ipsum</h1>
        <h2>Lorem ipsum dolor sit amet</h2>
      </header> */}
      <main>
        <Letter arrCounter={arrCounter} />
        <aside>
          <div>
            <Button onClick={() => addWidget('grid_center')}>
              <Icon icon="add" />
            </Button>
          </div>
          {arrCounter.map((item) =>
            item.type === 'grid_center' ? (
              <WidgetGridCenter key={item.id} widget={item} arrCounter={arrCounter} setArrCounter={setArrCounter} />
            ) : (
              <></>
            )
          )}
        </aside>
      </main>
      {/* <footer>Made with ❤️ by Haris Wahidin</footer> */}
    </>
  )
}

function Letter({arrCounter}) {
  const styleLetter = {
    boxSizing: 'border-box',
    borderWidth: '0',
    display: 'block',
    backgroundColor: 'rgba(0, 0, 0, .1)',
    padding: '16px',
    color: 'rgba(0,0,0,.875)',
    fontSize: '16px',
    lineHeight: '24px',
    fontFamily: 'sans-serif',
  }
  const styleTableContainer = {
    boxSizing: 'border-box',
    borderWidth: '0',
    display: 'block',
    backgroundColor: '#fff',
    width: '600px',
    margin: '0 auto',
  }
  const styleTableWrap = {
    boxSizing: 'border-box',
    borderWidth: '0',
    display: 'block',
    padding: '24px 16px',
    textAlign: 'center',
  }
  const styleTable = {
    boxSizing: 'border-box',
    borderWidth: '0',
    display: 'table',
    textIndent: '0',
    borderCollapse: 'collapse',
    borderSpacing: '0',
    width: '100%',
    tableLayout: 'fixed',
  }
  const styleTbody = {
    boxSizing: 'border-box',
    borderWidth: '0',
    display: 'table-row-group',
    verticalAlign: 'middle',
  }
  const styleTr = {
    boxSizing: 'border-box',
    borderWidth: '0',
    display: 'table-row',
    verticalAlign: 'middle',
  }
  const styleTd = {
    boxSizing: 'border-box',
    borderWidth: '0',
    display: 'table-cell',
    verticalAlign: 'middle',
  }
  return (
    <div style={styleLetter}>
      <div style={styleTableContainer}>
        {/* <div style={styleTableWrap}>
          <table cellPadding="0" cellSpacing="0" style={styleTable}>
            <tbody style={styleTbody}>
              <tr style={styleTr}>
                <td style={styleTd}></td>
                <td style={styleTd}></td>
                <td style={styleTd}></td>
                <td style={styleTd}></td>
                <td style={styleTd}></td>
                <td style={styleTd}></td>
                <td style={styleTd}></td>
                <td style={styleTd}></td>
                <td style={styleTd}></td>
                <td style={styleTd}></td>
                <td style={styleTd}></td>
                <td style={styleTd}></td>
              </tr>
              <tr style={styleTr}>
                <td style={styleTd}>Lorem ipsum</td>
                <td style={styleTd}>Lorem ipsum</td>
                <td style={styleTd}>Lorem ipsum</td>
                <td style={styleTd}>Lorem ipsum</td>
                <td style={styleTd}>Lorem ipsum</td>
                <td style={styleTd}>Lorem ipsum</td>
                <td style={styleTd}>Lorem ipsum</td>
                <td style={styleTd}>Lorem ipsum</td>
                <td style={styleTd}>Lorem ipsum</td>
                <td style={styleTd}>Lorem ipsum</td>
                <td style={styleTd}>Lorem ipsum</td>
                <td style={styleTd}>Lorem ipsum</td>
              </tr>
              <tr>
                <td colSpan="5.5" style={styleTd}>
                  1
                </td>
                <td style={styleTd}>2</td>
                <td colSpan="5.5" style={styleTd}>
                  3
                </td>
              </tr>
            </tbody>
          </table>
        </div> */}
        {arrCounter.map((item1) => {
          return (
            <div
              key={item1.id}
              style={{
                ...styleTableWrap,
                padding:
                  (item1.title.length > 0 || item1.description.length > 0) && item1.columns.length > 0
                    ? '20px 16px 18px'
                    : (item1.title.length > 0 || item1.description.length > 0) && item1.columns.length === 0
                    ? '20px 16px'
                    : item1.title.length === 0 && item1.description.length === 0 && item1.columns.length > 0
                    ? '24px 16px 18px'
                    : item1.title.length === 0 && item1.description.length === 0 && item1.columns.length === 0
                    ? 0
                    : styleTableWrap.padding,
              }}>
              {item1.title && (
                <p
                  style={{
                    margin: 0,
                    fontSize: arrFontSize[item1.idx_font_size + 1].font_size,
                    lineHeight: arrFontSize[item1.idx_font_size + 1].line_height + 'px',
                    fontWeight: item1.title_bold ? 700 : 400,
                    fontStyle: item1.title_italic ? 'italic' : 'normal',
                    // whiteSpace: "pre-wrap",
                  }}
                  dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(item1.title.replace(/\n/g, '<br />'))}}></p>
              )}
              {item1.description && (
                <p
                  style={{
                    margin: 0,
                    fontSize: arrFontSize[item1.idx_font_size - 1].font_size,
                    lineHeight: arrFontSize[item1.idx_font_size - 1].line_height + 'px',
                    fontWeight: item1.description_bold ? 700 : 400,
                    fontStyle: item1.description_italic ? 'italic' : 'normal',
                    // whiteSpace: "pre-wrap",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(item1.description.replace(/\n/g, '<br />')),
                  }}></p>
              )}
              <table
                cellPadding="0"
                cellSpacing="0"
                style={{
                  ...styleTable,
                  marginTop: (item1.title !== '' || item1.description !== '') && item1.columns.length > 0 ? '14px' : '',
                  fontWeight: item1.columns_bold ? 700 : 400,
                  fontStyle: item1.columns_italic ? 'italic' : 'normal',
                }}>
                <tbody style={styleTbody}>
                  <tr style={styleTr}>
                    <td
                      colSpan="12"
                      style={{
                        ...styleTd,
                        fontSize: 0,
                        lineHeight: 0,
                        textAlign: item1.columns_align_x,
                      }}>
                      <div
                        style={{
                          display: 'inline-block',
                        }}>
                        {item1.columns.map((item2, index2) => {
                          function Children() {
                            function IconOrder() {
                              return (
                                <p
                                  style={{
                                    width: arrFontSize[item1.idx_font_size].line_height,
                                    color: '#fff',
                                    fontSize: arrFontSize[item1.idx_font_size - 1].line_height,
                                    lineHeight: arrFontSize[item1.idx_font_size].line_height + 'px',
                                    fontWeight: 'bold',
                                    fontStyle: 'normal',
                                    overflow: 'hidden',
                                  }}>
                                  {index2 + 1}
                                </p>
                              )
                            }
                            return item1.icon_circled ? (
                              <div
                                style={{
                                  backgroundColor: 'red',
                                  margin: '0 6px',
                                  padding:
                                    (arrFontSize[item1.idx_font_size].line_height * 1.5 -
                                      arrFontSize[item1.idx_font_size].line_height) /
                                      2 +
                                    'px',
                                  display: 'inline-block',
                                  textAlign: 'center',
                                  borderRadius: '50%',
                                  verticalAlign: item2.columns_align_top ? 'top' : styleTd.verticalAlign,
                                }}>
                                {item1.icon_order ? (
                                  <IconOrder />
                                ) : (
                                  // <Icon
                                  //   icon={item2.icon}
                                  //   size={arrFontSize[item1.idx_font_size].line_height}
                                  //   color="#fff"
                                  //   style={{
                                  //     display: 'inline-block',
                                  //   }}
                                  // />
                                  <img
                                    src={window.location.origin + '/icons/white/' + item2.icon + '.png'}
                                    style={{
                                      width: arrFontSize[item1.idx_font_size].line_height + 'px',
                                      height: arrFontSize[item1.idx_font_size].line_height + 'px',
                                      display: 'inline-block',
                                    }}
                                  />
                                )}
                              </div>
                            ) : (
                              // <Icon
                              //   icon={item2.icon}
                              //   size={
                              //     arrFontSize[item1.idx_font_size].line_height +
                              //     arrFontSize[item1.idx_font_size].line_height / 4
                              //   }
                              //   style={{
                              //     margin: '0 6px',
                              //     display: 'inline-block',
                              //     verticalAlign: item2.columns_align_top ? 'top' : styleTd.verticalAlign,
                              //   }}
                              // />
                              <img
                                src={window.location.origin + '/icons/gray/' + item2.icon + '.png'}
                                style={{
                                  width:
                                    arrFontSize[item1.idx_font_size].line_height +
                                    arrFontSize[item1.idx_font_size].line_height / 4 +
                                    'px',
                                  height:
                                    arrFontSize[item1.idx_font_size].line_height +
                                    arrFontSize[item1.idx_font_size].line_height / 4 +
                                    'px',
                                  margin: '0 6px',
                                  display: 'inline-block',
                                  verticalAlign: item2.columns_align_top ? 'top' : styleTd.verticalAlign,
                                }}
                              />
                            )
                          }
                          function Text() {
                            return (
                              <p
                                style={{
                                  margin: item1.columns_break && item1.icon ? '6px 6px 0' : '0 6px',
                                  display: item1.columns_break ? 'block' : 'inline-block',
                                  fontSize: arrFontSize[item1.idx_font_size].font_size + 'px',
                                  lineHeight: arrFontSize[item1.idx_font_size].line_height + 'px',
                                  textAlign: item1.columns_break ? 'center' : 'left',
                                  // whiteSpace: "pre-wrap",
                                  verticalAlign: 'middle',
                                }}
                                dangerouslySetInnerHTML={{
                                  __html: DOMPurify.sanitize(item2.text.replace(/\n/g, '<br />')),
                                }}></p>
                            )
                          }
                          return (
                            <React.Fragment key={item2.id}>
                              {item2.url ? (
                                <a
                                  href={item2.url}
                                  style={{
                                    padding: '6px',
                                    display: 'inline-block',
                                    verticalAlign: item1.columns_align_top ? 'top' : 'middle',
                                  }}>
                                  {item1.icon && <Children />}
                                  {item2.text && <Text />}
                                </a>
                              ) : (
                                <div
                                  style={{
                                    padding: '6px',
                                    display: 'inline-block',
                                    verticalAlign: item1.columns_align_top ? 'top' : 'middle',
                                  }}>
                                  {item1.icon && <Children />}
                                  {item2.text && <Text />}
                                </div>
                              )}
                            </React.Fragment>
                          )
                        })}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
