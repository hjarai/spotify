
import PropTypes from 'prop-types';

//displays the Playlist Page, takes one parameter, the OneList to be displayed
export default function PlaylistPage({ setMode, OneList }) {

}

PlaylistPage.propTypes = {
    setMode : PropTypes.func,
    OneList : PropTypes.arrayOf(PropTypes.object).isRequired
}