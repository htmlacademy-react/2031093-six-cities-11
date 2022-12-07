type InsideItemCardProps = {
  item: string;
}

function InsideItemCard({ item }: InsideItemCardProps): JSX.Element {
  return (
    <li className="property__inside-item">
      {item}
    </li>
  );
}

export default InsideItemCard;
