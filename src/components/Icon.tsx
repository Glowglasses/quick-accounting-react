import styled from 'styled-components';

type Props = {
  name: string;
}

const Svg = styled.svg`
  height: 1.5em;
  width: 1.5em;
  fill: currentColor;
  vertical-align: bottom;
  overflow: hidden;
`
let importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext);
try {
  importAll(require.context('icons/', true, /\.svg$/));
} catch (error) {
  console.log(error);
}

function Icon(props: Props) {
  return (
    <Svg className="icon">
      <use xlinkHref={'#' + props.name}/>
    </Svg>
  );
}

export default Icon;