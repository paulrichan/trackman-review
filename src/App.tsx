/* 
  Built by: Paul Richan
  More info in README.md
*/

import Visuals from './views/visuals'
import Controls from './components/controls'
import { useDataStore } from './lib/store'
import { RawData } from './views/raw'
import { File } from 'lucide-react'
import { Label } from './components/ui/label'
import { Input } from './components/ui/input'

function App() {
  const [screen, file, setFile] = useDataStore((state) => [state.screen, state.file, state.setFile])

  return (
    <>
      <header className="py-3 border-b border-muted grid grid-cols-3 px-5 items-center">
        <div>
          <Label htmlFor="file">Trackman File</Label>
          <Input
            type="file"
            name="file"
            className="w-fit px-1"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) {
                setFile(file)
              }
            }}
          />
        </div>
        <h1 className="text-2xl text-center font-bold text-muted-foreground">Trackman Review</h1>
      </header>

      {file ? (
        <main className="max-w-7xl mx-auto px-3">
          <div className="flex flex-col gap-3 py-3">
            <Controls />

            {screen === 'visuals' && <Visuals />}
            {screen === 'raw' && <RawData />}
          </div>
        </main>
      ) : (
        <p className="flex items-center justify-center gap-1 opacity-50 py-5">
          <File />
          Choose your Trackman file!
        </p>
      )}
    </>
  )
}

export default App
