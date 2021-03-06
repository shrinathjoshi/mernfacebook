import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Route, Link, withRouter } from 'react-router-dom';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CameraIcon from '@material-ui/icons/Camera';
import Icon from '@material-ui/core/Icon';
import { connect } from 'react-redux';
import { uploadPhoto } from '../../actions/profileActions';
import { setTimeLineUser } from '../../actions/profileActions';
import { likePost, clearAllPosts } from '../../actions/postActions';
import TimeLine from './TimeLine';
import About from './About';
import Friends from './Friends';
import Photos from './Photos';
import axios from 'axios';
import * as constant from '../../common/constants/constant';

const useStyles = theme => ({
    timeline: {
        width: '85%',
        marginLeft: '5%',
        marginTop: '50px'
    },
    timeLineCover: {
        borderRadius: '2px'
    },
    coverPhoto: {
        width: '100%',
        height: 'auto',
        "& > img": {
            width: '100%',
            height: '400px',
            border: '1px solid #888888',
            boxShadow: '1px 1px #888888',
        }
    },
    profilePicture: {
        transform: 'translate(-35%,-80%)',
        position: 'absolute',
        left: '10%',
        "& img": {
            padding: theme.spacing(0.25, 0.25),
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            border: '2px solid #fff',
            background: '#fff',
            zIndex: 100
        }
    },
    uploadPhotoDiv: {
        bottom: '10px',
        left: '5px',
        overflow: 'hidden',
        width: '200px',
        position: 'absolute',
    },
    updatePhoto: {
        background: 'linear-gradient( transparent, rgba(0, 0, 0, .6) 0%, rgba(0, 0, 0, .6) 100% )',
        width: '100%',
        borderBottomLeftRadius: '90px',
        borderBottomRightRadius: '90px',
        height: '90px',
        textAlign: 'center',
        color: '#fff',
        cursor: 'pointer',
        transition: '0.3s'
    },
    uploadImageInput: {
        display: 'none'
    },
    timeLineNav: {
        paddingLeft: '30%',
        borderRadius: 'none',
        background: '#fff'
    },
    navList: {
        margin: 0,
        padding: 0,
        display: 'flex',
        listStyleType: 'none',
        borderLeft: '1px solid #e9eaed',
    },
    listItem: {
        borderRight: '1px solid #e9eaed',
        height: '43px',
        lineHeight: 3.05,
        padding: '17px 17px',
        position: 'relative',
        verticalAlign: 'middle',
        whiteSpace: 'nowrap',
        color: '#385898',
        cursor: 'pointer',
        textDecoration: 'none',
        fontSize: '16px',
        fontWeight: 600
    },
    totalFriends: {
        color: '#89919c',
        fontSize: '11px',
        fontWeight: 'normal',
        paddingLeft: '6px',
    },
    pageDetails: {
        marginTop: theme.spacing(2)
    },
    RightContent: {
        marginLeft: '20px',
        width: '120%'
    },
    photoGrid: {
        marginTop: theme.spacing(2)
    },
    friendGrid: {
        marginTop: theme.spacing(2)
    },
    actionContainer: {
        width: '50%',
        position: 'absolute'
    },
    interactingActions: {
        position: 'absolute',
        display: 'flex',
        padding: '0px 12px',
        bottom: '20px',
        left: '30%',
        "& div a": {
            padding: '4px 16px',
            background: '#e9eaed',
            border: '1px solid #ccd0d5',
            cursor: 'pointer'
        }
    },
    otherActions: {
        marginLeft: theme.spacing(1),
        display: 'flex'
    },
    typography: {
        padding: '8px 16px 4px 22px',
        fontSize: '14px',
    },
    arrowFriend: {
        content: " ",
        position: 'absolute',
        left: '5%',
        bottom: '100%',
        borderWidth: '10px',
        borderStyle: 'solid',
        borderColor: 'transparent transparent white'
    },
    arrowFollow: {
        content: " ",
        position: 'absolute',
        right: '5%',
        bottom: '100%',
        borderWidth: '10px',
        borderStyle: 'solid',
        borderColor: 'transparent transparent white'
    },
    popperElement: {
        zIndex: 50,
        maxWidth: '300px',
        minWidth: '192px',
    },
    popperContent: {
        transform: 'translate3d(0, 11px, 0px)',
        "& p:hover": {
            color: '#fff',
            background: '#385898',
            cursor: 'pointer'
        }
    },
    divider: {
        borderBottom: '1px solid #ddd',
        margin: '5px 7px 6px',
        paddingTop: '1px'
    },
    postItems: {
        marginTop: theme.spacing(5),
        display: 'block',
        width: '80%'
    },
    list: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    post: {
        width: '100%'
    },
    actionsResult: {
        padding: theme.spacing(1, 0),
        display: 'flex',
        maxWidth: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    actionsResultItem: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 0,
    },
    actionsList: {
        padding: theme.spacing(1, 2),
        display: 'flex',
        maxWidth: '100%',
        backgroundColor: theme.palette.background.paper,
        justifyContent: 'space-around'
    },
    actionItems: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: theme.spacing(0, 2),
        '&:hover': {
            cursor: 'pointer'
        }
    },
    actionIcons: {
        margin: theme.spacing(-0.5, 0.5),
        color: '#385898',
    },
    takeAction: {
        margin: theme.spacing(-0.5, 0.5),
        color: '#e9eaed'
    },
    likeResultIcon: {
        margin: theme.spacing(-0.5, 0.5),
    },
    commentSection: {
        marginTop: theme.spacing(1)
    },
    createComment: {
        marginTop: theme.spacing(2)
    },
    comments: {
        marginTop: theme.spacing(1)
    },
    divider: {
        borderBottom: '1px solid #ddd',
        margin: '5px 7px 6px',
        paddingTop: '1px'
    }
});

class TimeLineContainer extends Component {
    constructor() {
        super();
        this.state = {
            isFriend: false,
            isFollowing: false,
            anchorE1: null,
            anchorE2: null,
            isUpload: false,
            authUser: true,
        }
    }

    handleFriendPopper = (event) => {
        this.setState({
            anchorE1: (this.state.anchorE1) ? null : event.currentTarget,
            anchorE2: null
        })
    }

    handleFollowPopper = (event) => {
        this.setState({
            anchorE2: (this.state.anchorE2) ? null : event.currentTarget,
            anchorE1: null
        })
    }

    handleMouseOutFriend = () => {
        this.setState({ anchorE1: null, anchorE2: null })
    }
    handleMouseOutFollow = () => {
        this.setState({ anchorE2: null, anchorE1: null })
    }

    uploadProfilePhoto = (event) => {
        const { user } = this.props.auth;
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('userId', user.id);
        let fileStorageFolder = constant.IMAGEUPLOADSERVER;
        if(process.env.NODE_ENV === 'production'){
            fileStorageFolder = constant.IMAGEUPLOADS3
        }
        formData.append(fileStorageFolder, image);
        this.props.uploadPhoto(formData, user.userName)

    }

    sendFriendRequest(event, userId, tlUserId) {
        event.target.innerHTML = "Friend Request Sent";
        axios.post('/sendfriendrequest', {
            userId: userId,
            tlUserId: tlUserId
        })
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        const { classes } = this.props;
        const { user } = this.props.auth;
        const { timeLineUser } = this.props.profile;

        var openFriend = Boolean(this.state.anchorE1);
        var openFollow = Boolean(this.state.anchorE2);
        const { friends } = this.props.profile;

        let tlFriendStatus;
        if (!timeLineUser.authUser && friends.length > 0) {
            const friendStatus = friends.find(friend => friend.userName === user.userName);
            tlFriendStatus = (friendStatus) ? friendStatus.status : -1;
        }

        return (
            <div className={classes.timeline} >
                <div className={classes.timeLineCover} >
                    <div className={classes.coverPhoto} >
                        <img src="images/Batman.jpg" />
                    </div>
                    <div onMouseEnter={() => this.setState({ isUpload: true })}
                        onMouseLeave={() => this.setState({ isUpload: false })} className={classes.profilePicture} >
                        <a
                            href="#" >
                            {(timeLineUser.profileImage) ? <img onError={(e) => { e.target.src = 'images/404.png' }} src={timeLineUser.profileImage} /> : <img src="images/blank.png" />}
                        </a>
                        {(timeLineUser.authUser && this.state.isUpload) ? <div className={classes.uploadPhotoDiv}>
                            <input onChange={this.uploadProfilePhoto} className={classes.uploadImageInput} id="icon-button-file" type="file" />
                            <label htmlFor="icon-button-file">
                                <div className={classes.updatePhoto}>
                                    <div className={classes.cameraIcon}>
                                        <Icon><CameraIcon /></Icon>
                                    </div>
                                    Upload
                            </div>
                            </label>
                        </div> : null}
                    </div>
                    <div className={classes.timeLineNav} >
                        {(!timeLineUser.authUser) ?
                            <div className={classes.actionContainer} >
                                <div className={classes.interactingActions} >
                                    <div >
                                        {(tlFriendStatus && tlFriendStatus === 1) ?
                                            <a onClick={this.handleFriendPopper}
                                                variant="contained"
                                                color="default" > Friends </a> :
                                            (tlFriendStatus === 2) ?
                                                <a variant="contained"
                                                    color="default" >Friend Request Sent</a> :
                                                <a onClick={(e) => this.sendFriendRequest(e, user.id, timeLineUser._id)} variant="contained"
                                                    color="default" >Add Friend</a>
                                        }
                                        <Popper className={classes.popperElement}
                                            anchorEl={this.state.anchorE1}
                                            open={openFriend}
                                            placement='bottom-start'
                                            disablePortal={true}
                                            modifiers={
                                                {
                                                    flip: {
                                                        enabled: false,
                                                    },
                                                    preventOverflow: {
                                                        enabled: false,
                                                        boundariesElement: 'scrollParent',
                                                    },
                                                }
                                            } >
                                            <Paper className={classes.popperContent} >
                                                <div className={classes.arrowFriend} > </div>
                                                <Typography className={classes.typography} > Get Notifications </Typography>
                                                <hr className={classes.divider} />
                                                <Typography className={classes.typography} > Close Friends </Typography>
                                                <hr className={classes.divider} />
                                                <Typography className={classes.typography} > Unfriend </Typography>
                                            </Paper>
                                        </Popper>
                                    </div>
                                    <div className={classes.otherActions} >
                                        <div> {
                                            (this.state.isFollowing) ?
                                                <a onClick={this.handleFollowPopper}
                                                    variant="contained"
                                                    color="default" > Following </a> :
                                                <a variant="contained"
                                                    color="default" > Follow </a>
                                        }

                                            <Popper className={classes.popperElement}
                                                anchorEl={this.state.anchorE2}
                                                open={openFollow}
                                                placement='bottom-end'
                                                disablePortal={true}
                                                modifiers={
                                                    {
                                                        flip: {
                                                            enabled: false,
                                                        },
                                                        preventOverflow: {
                                                            enabled: false,
                                                            boundariesElement: 'scrollParent',
                                                        },
                                                    }
                                                } >
                                                <Paper className={classes.popperContent} >
                                                    <div className={classes.arrowFollow} > </div>
                                                    <Typography className={classes.typography} > See First </Typography>
                                                    <hr className={classes.divider} />
                                                    <Typography className={classes.typography} > Default </Typography>
                                                    <hr className={classes.divider} />
                                                    <Typography className={classes.typography} > Unfollow </Typography>
                                                </Paper>
                                            </Popper>
                                        </div>
                                        <div>
                                            <a variant="contained"
                                                color="default" > Message </a>
                                            <a variant="contained"
                                                color="default" > ... </a>
                                        </div>
                                    </div>
                                </div>
                            </div> :
                            null}
                        <ul className={classes.navList} >
                            <li> < Link to={`/${timeLineUser.userName}`}
                                className={classes.listItem} > TimeLine </Link></li >
                            <li> <Link to={`/${timeLineUser.userName}/about`}
                                className={classes.listItem} > About </Link></li >
                            <li> <Link to={`/${timeLineUser.userName}/friends`}
                                className={classes.listItem} > Friends <span className={classes.totalFriends} > {friends.length} </span></Link >
                            </li>
                            <li> <Link to={`/${timeLineUser.userName}/photos`}
                                className={classes.listItem} > Photos </Link></li >
                            <li> <Link to="#"
                                className={classes.listItem} > Archive </Link></li >
                            <li> <Link to="#"
                                className={classes.listItem} > More </Link></li >
                        </ul>
                    </div>
                </div>

                <Route exact path={`/${timeLineUser.userName}/`} component={TimeLine} />
                <Route exact path={`/${timeLineUser.userName}/about`} component={About} />
                <Route exact path={`/${timeLineUser.userName}/friends`} component={Friends} />
                <Route exact path={`/${timeLineUser.userName}/photos`} component={Photos} />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    post: state.post,
    profile: state.profile
})

export default connect(mapStateToProps, { uploadPhoto, setTimeLineUser, likePost, clearAllPosts })(withStyles(useStyles)(withRouter(TimeLineContainer)));