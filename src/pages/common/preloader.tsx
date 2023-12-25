
const Preloader = () => {
  return (
        <svg
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <rect opacity="0.5" width="50" height="50" fill="url(#pattern0)" />
          <animateTransform
            attributeName="transform"
            type="rotate"
            dur="1s"
            from="0"
            to="360"
            repeatCount="indefinite"
          />
          <defs>
            <pattern
              id="pattern0"
              patternContentUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <use xlinkHref="#image0_7_40132" transform="scale(0.01)" />
            </pattern>
            <image
              id="image0_7_40132"
              width="100"
              height="100"
              xlinkHref="data:image/png;base64,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"
            />
          </defs>
        </svg>
  );
};


export default Preloader;
