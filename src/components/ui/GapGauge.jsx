import React from 'react'

// A semi-circular instrument-style gauge, evoking a survey compass /
// measuring dial rather than a generic donut chart.

export default function GapGauge({
  value = 0,
  size = 220,
  label = 'Overall competency',
}) {
  const clamped = Math.max(0, Math.min(100, value))

  const radius = 90
  const cx = 110
  const cy = 110

  const startAngle = 180
  const endAngle = 0

  const angle =
    startAngle -
    (clamped / 100) *
      (startAngle - endAngle)


  const toRad = (deg) =>
    (deg * Math.PI) / 180


  const point = (
    deg,
    r = radius
  ) => ({
    x:
      cx +
      r *
        Math.cos(
          toRad(deg)
        ),

    y:
      cy -
      r *
        Math.sin(
          toRad(deg)
        ),
  })


  const arcPath = (
    fromDeg,
    toDeg,
    r = radius
  ) => {

    const start =
      point(fromDeg, r)

    const end =
      point(toDeg, r)

    const largeArc =
      fromDeg - toDeg > 180
        ? 1
        : 0

    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`
  }


  const needleTip =
    point(
      angle,
      radius - 18
    )


  const ticks =
    Array.from(
      { length: 11 },
      (_, i) =>
        180 - i * 18
    )


  // Green-only competency zones
  const zoneColor =
    clamped >= 75
      ? '#2F7D52'
      : clamped >= 55
        ? '#4F9D78'
        : '#79B89A'


  return (

    <div
      style={{ width: size }}
      className="mx-auto"
    >

      <svg
        viewBox="0 0 220 135"
        className="w-full"
      >

        {/* =================================================
            BACKGROUND TRACK
        ================================================= */}

        <path
          d={arcPath(180, 0)}
          fill="none"
          stroke="#EDF7F1"
          strokeWidth="14"
          strokeLinecap="round"
        />


        {/* =================================================
            GREEN ZONE SEGMENTS
        ================================================= */}

        <path
          d={arcPath(180, 129.6)}
          fill="none"
          stroke="#DDEFE5"
          strokeWidth="14"
        />

        <path
          d={arcPath(129.6, 79.2)}
          fill="none"
          stroke="#CBE5D6"
          strokeWidth="14"
        />

        <path
          d={arcPath(79.2, 0)}
          fill="none"
          stroke="#B7DCC6"
          strokeWidth="14"
        />


        {/* =================================================
            VALUE ARC
        ================================================= */}

        <path
          d={arcPath(180, angle)}
          fill="none"
          stroke={zoneColor}
          strokeWidth="14"
          strokeLinecap="round"
        />


        {/* =================================================
            TICKS
        ================================================= */}

        {ticks.map((deg) => {

          const outer =
            point(
              deg,
              radius + 10
            )

          const inner =
            point(
              deg,
              radius + 2
            )

          return (

            <line
              key={deg}
              x1={inner.x}
              y1={inner.y}
              x2={outer.x}
              y2={outer.y}
              stroke="#6FA98A"
              strokeWidth="1.5"
            />

          )

        })}


        {/* =================================================
            NEEDLE
        ================================================= */}

        <line
          x1={cx}
          y1={cy}
          x2={needleTip.x}
          y2={needleTip.y}
          stroke="#173D2B"
          strokeWidth="2.5"
          strokeLinecap="round"
        />


        <circle
          cx={cx}
          cy={cy}
          r="5"
          fill="#173D2B"
        />


        {/* =================================================
            VALUE
        ================================================= */}

        <text
          x={cx}
          y={cy - 30}
          textAnchor="middle"
          className="fill-green-950"
          style={{
            fontSize: '30px',
            fontWeight: 700,
            fontFamily: 'Sora, sans-serif',
          }}
        >
          {clamped}
        </text>


        <text
          x={cx}
          y={cy - 12}
          textAnchor="middle"
          className="fill-green-900"
          style={{
            fontSize: '11px',
            fontFamily: 'Inter, sans-serif',
            opacity: 0.65,
          }}
        >
          out of 100
        </text>

      </svg>


      <p className="mt-1 text-center text-sm font-medium text-green-900/80">
        {label}
      </p>

    </div>

  )
}