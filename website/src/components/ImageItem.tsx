import { black, blue, cyan, green, lime, orange, pink, purple, red, teal, yellow } from 'material-colors';

export interface ImageItemProps {
  source?: string;

  name: string;
}

export const ImageItem = (image: ImageItemProps) => {
  const { name, source } = image;
  if (!(source === null || source === undefined || source === '')) {
    return <img src={source} alt={name} loading="lazy" className="image-item"/>;
  }
  const random = Math.round(Math.random() * 11);
  const colors = [red[900], blue[900], black[900], pink[900], cyan[900], teal[900], orange[900], yellow[900], green[900], lime[900], purple[900]];
  return <div className="no-featured-image" style={ { backgroundColor: colors[random] } }><i className="fas fa-bottle-droplet" /></div>;
};