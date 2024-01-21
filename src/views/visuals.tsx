import ReusableScatter from '@/components/reusable-scatter'
import Usages from '@/components/usage-bars'
import VeloAreaChart from '@/components/velo-area-chart'
import { useTrackmanData } from '@/hooks/useTrackmanData'
import { useDataStore } from '@/lib/store'

function Visuals() {
  const [pitchType, pitcher] = useDataStore((state) => [state.pitchType, state.pitcher])
  const { pitcherData } = useTrackmanData(pitcher)

  return (
    <>
      <VeloAreaChart pitcherData={pitcherData} pitchType={pitchType} />

      <div className="grid md:grid-cols-7 gap-3">
        <div className="bg-muted/50 shadow-md w-full h-[350px] p-3 relative col-span-2">
          <h2 className="font-semibold text-center">Movement</h2>
          <ReusableScatter
            data={pitcherData}
            pitchType={pitchType}
            dataKeys={[
              { key: 'InducedVertBreak', label: 'Induced Vert' },
              { key: 'HorzBreak', label: 'Horz Break' }
            ]}
          />
        </div>

        <div className="bg-muted/50 shadow-md w-full h-[350px] p-3 col-span-3">
          <h2 className="font-semibold text-center">Usage</h2>
          <Usages data={pitcherData} />
        </div>

        <div className="bg-muted/50 shadow-md w-full h-[350px] p-3 relative col-span-2">
          <h2 className="font-semibold text-center">Release</h2>
          <ReusableScatter
            data={pitcherData}
            pitchType={pitchType}
            dataKeys={[
              {
                key: 'RelHeight',
                label: 'Release Height'
              },
              { key: 'RelSide', label: 'Release Side' }
            ]}
          />
        </div>
      </div>
    </>
  )
}

export default Visuals
