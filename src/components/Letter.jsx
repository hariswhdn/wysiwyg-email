import React from 'react'
import {arrFontSize, arrPadding} from './Widget'
import DOMPurify from 'dompurify'

function Letter({arrCounter}) {
  const styleLetter = {
    boxSizing: 'border-box',
    borderWidth: '0',
    display: 'block',
    backgroundColor: '#E8E8E8',
    padding: '16px',
    color: '#202020',
    fontSize: '14px',
    lineHeight: '20px',
    fontFamily: 'sans-serif',
  }
  const styleTableContainer = {
    boxSizing: 'border-box',
    borderWidth: '0',
    display: 'block',
    backgroundColor: '#FCFCFC',
    width: '600px',
    margin: '0 auto',
  }
  const styleTableWrap = {
    boxSizing: 'border-box',
    borderWidth: '0',
    display: 'block',
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
        {arrCounter.map((item1) => {
          return item1.title.length === 0 && item1.description.length === 0 && item1.columns.length === 0 ? (
            <React.Fragment key={item1.id}></React.Fragment>
          ) : (
            <div
              key={item1.id}
              style={{
                ...styleTableWrap,
                backgroundColor: item1.background_color,
                padding:
                  item1.title.length > 0 || item1.description.length > 0 || item1.columns.length > 0
                    ? arrFontSize[item1.idx_font_size + 1].line_height * arrPadding[item1.idx_padding_top].fraction +
                      'px ' +
                      arrFontSize[item1.idx_font_size + 1].font_size +
                      'px ' +
                      arrFontSize[item1.idx_font_size + 1].line_height * arrPadding[item1.idx_padding_bottom].fraction +
                      'px'
                    : 0,
              }}>
              {item1.title && (
                <p
                  style={{
                    margin:
                      '0 0 ' +
                      (item1.description ? Math.ceil(arrFontSize[item1.idx_font_size + 1].line_height / 4) : 0) +
                      'px',
                    color: item1.title_color,
                    fontSize: arrFontSize[item1.idx_font_size + 1].font_size,
                    lineHeight: arrFontSize[item1.idx_font_size + 1].line_height + 'px',
                    fontWeight: item1.title_bold ? 700 : 400,
                  }}
                  dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(item1.title.replace(/\n/g, '<br />'))}}></p>
              )}
              {item1.description && (
                <p
                  style={{
                    margin: 0,
                    color: item1.description_color,
                    fontSize:
                      arrFontSize[item1.idx_font_size > 0 ? item1.idx_font_size - 1 : item1.idx_font_size].font_size,
                    lineHeight:
                      arrFontSize[item1.idx_font_size > 0 ? item1.idx_font_size - 1 : item1.idx_font_size].line_height +
                      'px',
                    fontWeight: item1.description_bold ? 700 : 400,
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
                  marginTop:
                    (item1.title !== '' || item1.description !== '') && item1.columns.length > 0
                      ? arrFontSize[item1.idx_font_size].font_size + 'px'
                      : '',
                  fontWeight: item1.columns_bold ? 700 : 400,
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
                          width: '100%',
                        }}>
                        {item1.columns.map((item2, index2) => {
                          function Children() {
                            function IconOrder() {
                              return (
                                <p
                                  style={{
                                    width: arrFontSize[item1.idx_font_size].line_height,
                                    height: arrFontSize[item1.idx_font_size].line_height,
                                    margin: 0,
                                    display: 'inline-block',
                                    color: item1.icon_order_color,
                                    fontSize:
                                      item1.icon_circled || item1.icon_circled_border
                                        ? arrFontSize[
                                            item1.idx_font_size > 1 ? item1.idx_font_size - 1 : item1.idx_font_size
                                          ].line_height
                                        : arrFontSize[item1.idx_font_size].font_size,
                                    lineHeight: arrFontSize[item1.idx_font_size].line_height + 'px',
                                    fontWeight: 'bold',
                                    fontStyle: 'normal',
                                    verticalAlign: item2.columns_align_top ? 'top' : styleTd.verticalAlign,
                                    overflow: 'hidden',
                                  }}>
                                  {index2 + 1 + (!item1.icon_circled && !item1.icon_circled_border && '.')}
                                </p>
                              )
                            }
                            return item1.icon_circled || item1.icon_circled_border ? (
                              <div
                                style={{
                                  backgroundColor: item1.icon_circled ? item1.icon_circled_color : 'transparent',
                                  margin:
                                    '0 ' + Math.floor(arrFontSize[item1.idx_font_size + 1].line_height / 4) + 'px',
                                  padding:
                                    (arrFontSize[item1.idx_font_size + 1].line_height * 1.5 -
                                      arrFontSize[item1.idx_font_size + 1].line_height) /
                                      2 +
                                    'px',
                                  display: 'inline-block',
                                  textAlign: 'center',
                                  border: item1.icon_circled_border
                                    ? '1px solid ' + item1.icon_circled_border_color
                                    : 'none',
                                  borderRadius: '50%',
                                  verticalAlign: item2.columns_align_top ? 'top' : styleTd.verticalAlign,
                                }}>
                                {item1.icon_order ? (
                                  <IconOrder />
                                ) : (
                                  <img
                                    src={
                                      window.location.origin +
                                      '/icons/' +
                                      (item1.dark_mode ? 'white' : 'gray') +
                                      '/' +
                                      item2.icon +
                                      '.png'
                                    }
                                    style={{
                                      width: arrFontSize[item1.idx_font_size + 1].line_height + 'px',
                                      height: arrFontSize[item1.idx_font_size + 1].line_height + 'px',
                                      display: 'inline-block',
                                    }}
                                    alt={item2.icon}
                                  />
                                )}
                              </div>
                            ) : item1.icon_order ? (
                              <IconOrder />
                            ) : (
                              <img
                                src={
                                  window.location.origin +
                                  '/icons/' +
                                  (item1.dark_mode ? 'white' : 'gray') +
                                  '/' +
                                  item2.icon +
                                  '.png'
                                }
                                style={{
                                  width:
                                    arrFontSize[item1.idx_font_size + 1].line_height +
                                    arrFontSize[item1.idx_font_size + 1].line_height / 4 +
                                    'px',
                                  height:
                                    arrFontSize[item1.idx_font_size + 1].line_height +
                                    arrFontSize[item1.idx_font_size + 1].line_height / 4 +
                                    'px',
                                  margin:
                                    '0 ' + Math.floor(arrFontSize[item1.idx_font_size + 1].line_height / 4) + 'px',
                                  display: 'inline-block',
                                  verticalAlign: item2.columns_align_top ? 'top' : styleTd.verticalAlign,
                                }}
                                alt={item2.icon}
                              />
                            )
                          }
                          function Text({isArticle, isArticleTitle}) {
                            return (
                              <p
                                style={{
                                  color: item1.columns_color,
                                  margin:
                                    isArticle && isArticleTitle
                                      ? '4px 6px 0'
                                      : isArticle && !isArticleTitle
                                      ? '4px 6px'
                                      : item1.columns_break &&
                                        item1.icon &&
                                        !(item1.icon_order && !item1.icon_circled && !item1.icon_circled_border)
                                      ? Math.floor(arrFontSize[item1.idx_font_size + 1].line_height / 4) +
                                        'px ' +
                                        (Math.floor(arrFontSize[item1.idx_font_size + 1].line_height / 4) + 'px ') +
                                        '0'
                                      : '0 ' + Math.floor(arrFontSize[item1.idx_font_size + 1].line_height / 4) + 'px',
                                  display: item1.columns_break ? 'block' : 'inline-block',
                                  fontSize:
                                    (isArticle && isArticleTitle
                                      ? 16
                                      : isArticle && !isArticleTitle
                                      ? 12
                                      : arrFontSize[item1.idx_font_size].font_size) + 'px',
                                  lineHeight:
                                    (isArticle && isArticleTitle
                                      ? 24
                                      : isArticle && !isArticleTitle
                                      ? 16
                                      : arrFontSize[item1.idx_font_size].line_height) + 'px',
                                  textAlign: item1.columns_break && !item1.is_article ? 'center' : 'left',
                                  verticalAlign: 'middle',
                                  ...(isArticle && !isArticleTitle
                                    ? {
                                        textOverflow: 'ellipsis',
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        width: 'calc(100% - 12px)',
                                      }
                                    : {}),
                                }}
                                dangerouslySetInnerHTML={
                                  isArticle
                                    ? null
                                    : {
                                        __html: DOMPurify.sanitize(item2.text.replace(/\n/g, '<br />')),
                                      }
                                }>
                                {isArticle && isArticleTitle
                                  ? item2.text
                                  : isArticle && !isArticleTitle
                                  ? item2.snippet
                                  : null}
                              </p>
                            )
                          }
                          return (
                            <React.Fragment key={item2.id}>
                              {item2.url ? (
                                <a
                                  tabIndex={-1}
                                  href={item2.url}
                                  style={{
                                    backgroundColor: item1.icon_boxed ? item1.icon_boxed_color : 'transparent',
                                    margin:
                                      item1.icon_boxed || item1.icon_boxed_border
                                        ? Math.floor(arrFontSize[item1.idx_font_size + 1].line_height / 4) + 'px'
                                        : 0,
                                    padding: Math.floor(arrFontSize[item1.idx_font_size + 1].line_height / 4) + 'px',
                                    display: 'inline-block',
                                    textAlign: item1.is_article ? 'justify' : 'center',
                                    textDecoration: 'none',
                                    border: item1.icon_boxed_border
                                      ? '1px solid ' + item1.icon_boxed_border_color
                                      : 'none',
                                    borderRadius:
                                      item1.icon_boxed || item1.icon_boxed_border
                                        ? Math.floor(arrFontSize[item1.idx_font_size + 1].line_height / 4) + 'px'
                                        : 'none',
                                    verticalAlign: !item1.columns_align_top && !item1.is_article ? 'middle' : 'top',
                                    width: item1.is_article ? 'calc(50% - 12px)' : 'unset',
                                  }}>
                                  {item1.icon && !item1.is_article && <Children />}
                                  {item2.text &&
                                    (item1.is_article ? (
                                      <>
                                        <Text isArticle={true} isArticleTitle={true} />
                                        {item2.snippet && <Text isArticle={true} isArticleTitle={false} />}
                                      </>
                                    ) : (
                                      <Text />
                                    ))}
                                </a>
                              ) : (
                                <div
                                  style={{
                                    backgroundColor: item1.icon_boxed ? item1.icon_boxed_color : 'transparent',
                                    margin:
                                      item1.icon_boxed || item1.icon_boxed_border
                                        ? Math.floor(arrFontSize[item1.idx_font_size + 1].line_height / 4) + 'px'
                                        : 0,
                                    padding: Math.floor(arrFontSize[item1.idx_font_size + 1].line_height / 4) + 'px',
                                    display: 'inline-block',
                                    textAlign: 'center',
                                    border: item1.icon_boxed_border
                                      ? '1px solid ' + item1.icon_boxed_border_color
                                      : 'none',
                                    borderRadius:
                                      item1.icon_boxed || item1.icon_boxed_border
                                        ? Math.floor(arrFontSize[item1.idx_font_size + 1].line_height / 4) + 'px'
                                        : 'none',
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

export default Letter
