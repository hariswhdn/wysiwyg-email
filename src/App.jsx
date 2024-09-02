import React, {useEffect, useState} from 'react'
import Icon from './components/Icon'
import Button from './components/Button'
import {WidgetGridCenter} from './components/Widget'
import Letter from './components/Letter'

function App() {
  const [counter, setCounter] = useState(0)
  const [arrCounter, setArrCounter] = useState([])

  // useEffect(() => {
  //   console.log('arrCounter', arrCounter)
  // }, [arrCounter])

  function addWidget() {
    if (arrCounter.length < 9) {
      const willCounter = counter + 1
      setCounter(willCounter)
      setArrCounter([{...JSON.parse(JSON.stringify(objWidget)), id: willCounter}, ...arrCounter])
    }
  }

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(document.querySelector('main > div').outerHTML)
      const el = document.getElementById('copy')
      el.nextElementSibling.innerHTML = 'Copied'
      setTimeout(function () {
        el.nextElementSibling.innerHTML = 'Copy'
      }, 1250)
    } catch (err) {
      alert('Failed to copy: ', err)
    }
  }

  return (
    <>
      <main>
        <Letter arrCounter={arrCounter} />
        <aside>
          <div>
            <div>
              <Button onClick={() => addWidget('grid_center')}>
                <Icon icon="add" />
              </Button>
              <p>Add widget</p>
            </div>
            <div>
              <Button id="copy" disabled={arrCounter.length === 0} onClick={copyCode}>
                <Icon icon="code" />
              </Button>
              <p>Copy</p>
            </div>
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
      <footer>
        <h1>Email WYSIWYG</h1>
        <h2>Marketing tools</h2>
        <h3>by Haris Wahidin</h3>
      </footer>
    </>
  )
}

const objWidget = {
  id: 1,
  type: 'grid_center',
  title: '',
  title_bold: false,
  description: '',
  description_bold: false,
  idx_font_size: 1,
  idx_padding_top: 3,
  idx_padding_bottom: 3,
  icon: true,
  is_article: false,
  icon_order: false,
  icon_circled: true,
  icon_circled_border: true,
  icon_boxed: false,
  icon_boxed_border: false,
  columns: [],
  columns_bold: false,
  columns_align_top: false,
  columns_align_x: 'center',
  columns_break: false,
  dark_mode: false,
  background_color: '#FCFCFC',
  title_color: '#202020',
  description_color: '#646464',
  icon_circled_color: '#F0F0F0',
  icon_circled_border_color: '#E0E0E0',
  icon_boxed_color: '#F9F9F9',
  icon_boxed_border_color: '#E8E8E8',
  icon_order_color: '#646464',
  columns_color: '#202020',
}

export default App
