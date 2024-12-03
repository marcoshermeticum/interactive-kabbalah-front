interface Props {
  className?: string;
  type: 'vertical' | 'horizontal' | 'diagonal';
  degree?: 35 | 140;
}

function Path({ className, type, degree }: Props) {
  const matrix = {
    35: 'matrix(0.819152116776, 0.57357609272, -0.57357609272, 0.819152116776, 0.000032239037, 0.000017759423)', //   ->  \
    140: 'matrix(-0.766044914722, 0.642786979675, -0.642786979675, -0.766044914722, 0.000025774902, 0.000001218199)', // ->  /
  };

  if (type === 'diagonal' && degree) {
    return (
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="107.03 135.9537 272.4089 210.6547"
        width="272.409px"
        height="210.655px"
        preserveAspectRatio="none"
      >
        <path
          d="M 392.813 217.436 L 392.813 241.281 L 392.813 265.126 L 243.235 265.126 L 93.656 265.126 L 93.656 241.281 L 93.656 217.436 L 243.235 217.436 L 392.813 217.436"
          style={{
            fill: 'rgb(250, 233, 15)',
            stroke: 'rgb(255, 255, 255)',
            transformOrigin: '243.234px 241.281px',
          }}
          transform={matrix[degree]}
          id="object-0"
        />
      </svg>
    );
  }

  if (type === 'horizontal') {
    return (
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0.579 217.4358 500 47.6905"
        width="500px"
        height="47.6905px"
      >
        <path
          d="M 500.579 217.436 L 500.579 241.281 L 500.579 265.126 L 250.579 265.126 L 0.579 265.126 L 0.579 241.281 L 0.579 217.436 L 250.579 217.436 L 500.579 217.436"
          style={{
            fill: 'rgb(42, 134, 70)',
            stroke: 'rgb(255, 255, 255)',
            transformOrigin: '250.579px 241.281p',
          }}
          id="object-0"
          transform="matrix(1, 0.000001, -0.000001, 1, -1.7e-11, 1.8e-11)"
        />
      </svg>
    );
  }

  return <div>path</div>;
}

export default Path;
