import SvgIcons from 'src/presentation/assets/icons/svgs';

type IIconMapping = {
  [key in string]: React.JSX.ElementType;
};

export const SVG_ICONS = {
  FLASK_ICON: 'FlaskIcon',
};

export const SVG_ICON_COMPONENT_MAP: IIconMapping = {
  [SVG_ICONS.FLASK_ICON]: SvgIcons.FlaskIcon,
};
