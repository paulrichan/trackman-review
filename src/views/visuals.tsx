import ReusableScatter from '@/components/reusable-scatter'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
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

      <div className="grid md:grid-cols-3 gap-3">
        <div className="bg-muted/50 shadow-md w-full h-[350px] p-3 relative">
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

        <div className="bg-muted/50 shadow-md w-full h-[350px] p-3">
          <h2 className="font-semibold text-center">Usage</h2>
          <Usages data={pitcherData} />
        </div>

        <div className="bg-muted/50 shadow-md w-full h-[350px] p-3 relative">
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

      <Label>Post Game Notes</Label>
      <Textarea placeholder="Type your notes here..." rows={10} />

      {/* TODO: Setup form if api permits submitting note data. */}
      <Button className="md:w-1/3 mx-auto">Submit</Button>
    </>
  )
}

export default Visuals
