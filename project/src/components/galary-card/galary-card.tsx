type GalaryCardProps = {
  imagePath: string;
}

function GalaryCard({ imagePath }: GalaryCardProps): JSX.Element {
  return (
    <div className="property__image-wrapper">
      <img className="property__image" src={imagePath} alt="Studio"></img>
    </div>
  );
}

export default GalaryCard;
