
import PropTypes from 'prop-types';
import Head from 'next/head';
/* eslint-disable no-undef, no-unused-vars */

//displays the Playlist Page, takes one parameter, the OneList to be displayed
export default function PlaylistPage({ setMode, OneList }) {

    return(
        //ADD LABELS TO EACH COMPONENT
        <div> 
            <Head>
                <title>Playlist Page Placeholder!</title>
            </Head>
        </div>

    );

}

PlaylistPage.propTypes = {
    setMode : PropTypes.func,
    OneList : PropTypes.arrayOf(PropTypes.object).isRequired
}