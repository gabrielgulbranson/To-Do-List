import background from '../assets/images/blackBrick.jpg'
function Header() {
    return (
        <div style={{
            textAlign: 'center',
            backgroundImage: `url(${background})`,

            backgroundSize: '70%',
            height: '100px',
            paddingTop: '0px'

        }}>
            <header>
                <h1 style={{ color: 'white', paddingTop: '25px' }}>To-Do List</h1>
            </header>
        </div>
    );
}

export default Header;