/* 
  Phillies Take Home Assignment
  Built by: Paul Richan
  More info in README.md
*/

import Visuals from './views/visuals'
import Controls from './components/controls'
import { useTrackmanData } from './hooks/useTrackmanData'
import { useDataStore } from './lib/store'
import { RawData } from './views/raw'

function App() {
  const [pitcher, screen] = useDataStore((state) => [state.pitcher, state.screen])
  const { isLoading: isLoadingTrackmanData } = useTrackmanData(pitcher)

  return (
    <>
      <header className="py-3 border-b border-muted flex items-center justify-center">
        <img src="/phillies-logo.png" alt="logo" className="w-fit object-contain h-10" />
        <h1 className="text-2xl text-center font-bold text-muted-foreground">Phillies Pitcher Review</h1>
      </header>

      <main className="max-w-7xl mx-auto">
        {isLoadingTrackmanData ? (
          <div>Loading...</div>
        ) : (
          <div className="flex flex-col gap-3 py-3">
            <Controls />

            {screen === 'visuals' && <Visuals />}
            {screen === 'raw' && <RawData />}
          </div>
        )}
      </main>
    </>
  )
}

export default App
