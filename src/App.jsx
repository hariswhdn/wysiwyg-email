import React, {useEffect, useState} from 'react'
import Icon from './components/Icon'
import Button from './components/Button'
import {WidgetGridCenter} from './components/Widget'
import Letter from './components/Letter'

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

const objWidget = {
  id: 1,
  type: 'grid_center',
  title: '',
  title_bold: false,
  title_italic: false,
  title_color: '#202020',
  description: '',
  description_bold: false,
  description_italic: false,
  description_color: '#646464',
  idx_font_size: 2,
  icon: true,
  icon_order: false,
  icon_circled: true,
  icon_circled_color: '#F0F0F0',
  columns: [],
  columns_bold: false,
  columns_italic: false,
  columns_color: '#202020',
  columns_align_top: false,
  columns_align_x: 'center',
  columns_break: false,
  dark_mode: false,
  background_color: '#FCFCFC',
}

export default App
