import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useTrackmanData } from '@/hooks/useTrackmanData'
import { useDataStore } from '@/lib/store'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { useState } from 'react'

const SORTABLES: (keyof TrackmanData)[] = [
  'PitchNo',
  'RelSpeed',
  'VertRelAngle',
  'HorzRelAngle',
  'SpinRate',
  'SpinAxis',
  'Tilt',
  'RelHeight',
  'RelSide',
  'Extension',
  'VertBreak',
  'InducedVertBreak',
  'HorzBreak',
  'PlateLocHeight',
  'PlateLocSide',
  'ZoneSpeed',
  'VertApprAngle',
  'HorzApprAngle',
  'ZoneTime',
  'ExitSpeed',
  'Angle'
]

export function RawData() {
  const { pitcher } = useDataStore((state) => ({ pitcher: state.pitcher }))
  const { pitcherData: originalPitcherData } = useTrackmanData(pitcher)

  const [sortField, setSortField] = useState<keyof TrackmanData | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null)
  const pitcherData = [...originalPitcherData]

  if (sortField !== null) {
    // If sortDirection is null, reset the sort
    if (sortDirection === null) {
      setSortDirection(null)
      setSortField(null)
    }

    pitcherData.sort((a, b) => {
      const val1 = isNaN(Number(a[sortField])) ? a[sortField] : Number(a[sortField])
      const val2 = isNaN(Number(b[sortField])) ? b[sortField] : Number(b[sortField])
      if (val1 < val2) return sortDirection === 'asc' ? -1 : 1
      if (val1 > val2) return sortDirection === 'asc' ? 1 : -1
      return 0
    })
  }

  const handleSort = (field) => {
    setSortField(field)
    setSortDirection(sortDirection === 'asc' ? 'desc' : sortDirection === 'desc' ? null : 'asc')
  }

  if (!pitcherData.length) return null

  return (
    <Table>
      <TableCaption>All raw data from Trackman csv.</TableCaption>
      <TableHeader>
        <TableRow>
          {Object.keys(pitcherData[0]).map((key, idx) => (
            <TableHead key={idx}>
              {SORTABLES.includes(key) ? (
                <Button size="sm" variant="ghost" className="px-1" onClick={() => handleSort(key)}>
                  {key}

                  {sortField === key && (
                    <span className="ml-1">
                      {sortDirection === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                    </span>
                  )}
                </Button>
              ) : (
                key
              )}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {pitcherData.map((pitch, idx) => (
          <TableRow key={idx}>
            {Object.values(pitch).map((value, idx) => (
              <TableCell key={idx}>{value}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
