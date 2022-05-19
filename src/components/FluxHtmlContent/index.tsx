export type FluxHtmlContentProps = {
  html: string|undefined
}

const FluxHtmlContent = (props: FluxHtmlContentProps) => {
  if(props.html === undefined) {
    return (<div />);
  }
  return (
    <span dangerouslySetInnerHTML={
      {
        __html: props.html
      }
    }
    />
  );
};

export default FluxHtmlContent;



