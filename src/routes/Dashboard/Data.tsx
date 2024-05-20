import { BarChart } from '@mui/x-charts'

export default function Data() {
  const h1 = [60, 41, 37, 31, 60, 36, 39, 32, 33, 59]
  const t1 = [31, 30, 37, 33, 33, 34, 37, 30, 31, 33]

  return (
    <BarChart
      xAxis={[
        {
          scaleType: 'band',
          data: [
            '2024-05-19 08:11:05',
            '2024-05-19 08:11:06',
            '2024-05-19 08:11:07',
            '2024-05-19 08:11:08',
            '2024-05-19 08:11:09',
            '2024-05-19 08:11:10',
            '2024-05-19 08:11:11',
            '2024-05-19 08:11:12',
            '2024-05-19 08:11:13',
            '2024-05-19 08:11:14'
          ]
        }
      ]}
      series={[
        { data: h1, label: 'Humidity' },
        { data: t1, label: 'Temperature' }
      ]}
      width={800}
      height={400}
    />
  )
}
