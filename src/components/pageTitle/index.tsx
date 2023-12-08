import "./style.css";

interface Props {
  title: string;
}

const PageTitle = ({ title }: Props) => {
  return <h1>{title}</h1>;
};

export default PageTitle;
