import preact from 'preact';

export default ({thumb, onClick}) => {
    return (
        <div>
          <img src={thumb} onClick={onClick}/>
        </div>
    );
}
