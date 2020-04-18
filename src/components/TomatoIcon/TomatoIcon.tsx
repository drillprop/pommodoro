import React from 'react';
import { StyledSvg } from './TomatoIcon.styles';
import { animated } from 'react-spring';

interface Props {
  size?: string;
  fill?: string;
  coverage?: any;
}

const TomatoIcon: React.FC<Props> = ({ size, fill, coverage }) => {
  return (
    <>
      <StyledSvg viewBox={`0 0 50 50`} size={size} fill={fill}>
        {coverage && (
          <mask id='tomatoMask'>
            <animated.rect
              x='0'
              y='0'
              width='100'
              height={coverage}
              fill='white'
            />
          </mask>
        )}
        <path
          d='M16.986,15.247l0.969,2.277c-4.784,2.037-8.363,6.171-8.363,11.545H7.11   C7.11,22.703,11.292,17.67,16.986,15.247 M37.432,5.992c-3.051-0.488-5.474-0.673-8.294,0.772C28.714,3.689,27.721,2.121,25.461,0   c-2.259,2.121-3.251,3.691-3.676,6.764C18.92,5.295,16.506,5.51,13.49,5.992c0.098,2.057,0.165,3.523,1.399,5.332   C7.705,14.63,2.546,21.462,2.546,29.568c0,12.187,11.149,20.566,22.763,20.43c11.391-0.137,22.145-8.495,22.145-20.43   c0-7.826-4.817-14.493-11.658-17.916C37.229,9.77,37.329,8.206,37.432,5.992z M34.34,8.426c-1.114,3.494-5.588,4.697-8.879,4.697   c-3.289,0-7.766-1.203-8.878-4.697c3.907-0.109,5.724,2.085,8.387,4.424c-0.368-3.021-1.013-5.747,0.491-8.602   c1.505,2.843,0.857,5.592,0.491,8.602C28.616,10.511,30.434,8.317,34.34,8.426z'
          mask={coverage && 'url(#tomatoMask)'}
        />
      </StyledSvg>
    </>
  );
};

export default TomatoIcon;
