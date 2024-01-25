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
import { Switch } from './components/ui/switch'

function App() {
  const [screen, file, setFile, decidedPitchType, setDecidedPitchType] = useDataStore((state) => [
    state.screen,
    state.file,
    state.setFile,
    state.decidedPitchType,
    state.setDecidedPitchType
  ])

  console.log(decidedPitchType)

  return (
    <>
      <header className="py-3 border-b border-muted ">
        <div className="max-w-7xl mx-auto grid gap-3 md:grid-cols-3 items-center px-5 ">
          <div className="order-1">
            <Label htmlFor="file">Trackman File</Label>
            <Input
              type="file"
              name="file"
              accept=".csv"
              className="w-fit px-1"
              onChange={(e) => {
                const file = e.target.files?.[0]
                setFile(file ?? null)
              }}
            />
          </div>
          <h1 className="text-2xl text-center font-bold text-muted-foreground md:order-2">Trackman Pitcher Review</h1>
          <div className="flex items-center space-x-2 order-3 justify-end">
            <Label
              htmlFor="decidedPitchType"
              className={`${decidedPitchType === 'TaggedPitchType' ? 'opacity-100' : 'opacity-50'}`}
            >
              Tagged
            </Label>
            <Switch
              id="decidedPitchType"
              className="data-[state=checked]:bg-input"
              onCheckedChange={(e) => {
                setDecidedPitchType(e ? 'AutoPitchType' : 'TaggedPitchType')
              }}
            />
            <Label
              htmlFor="decidedPitchType"
              className={`${decidedPitchType === 'AutoPitchType' ? 'opacity-100' : 'opacity-50'}`}
            >
              Auto
            </Label>
          </div>
        </div>
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
