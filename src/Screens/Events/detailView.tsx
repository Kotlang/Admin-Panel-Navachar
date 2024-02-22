/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Metadata, RpcError } from 'grpc-web';
import likeIcon from "src/assets/icons/likeIcon.svg";
import groupIcon from "src/assets/icons/groupIcon.svg";
import clients from 'src/clients';
import navArrowIcon from "src/assets/icons/navArrowIcon.svg";
import { EventProto } from "src/generated/events_pb";
import { CommentProto, CommentsFetchResponse } from 'src/generated/actions_pb'
import { useParams } from "react-router-dom";
import { IEventData, MediaUrl } from "src/types";
import moment from 'moment';

function DetailView() {
    const { eventId } = useParams();
    const [event, setEvent] = useState<IEventData>();
    const [mediaUrls, setMediaUrls] = useState<MediaUrl[]>([]);
    const [comments, setComments] = useState<CommentProto[]>([]);
    const [refreshKey, setRefreshKey] = useState(0);

    const fetchEventById = (eventId: string, metaData: Metadata | null): Promise<EventProto> => {
        return new Promise((resolve, reject) => {
            clients.social.event.GetEvent(eventId, metaData, (err: RpcError, response: EventProto) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(response);
                }
            });
        });
    };

    const fetchCommetsByID = (eventId: string, metaData: Metadata | null): Promise<CommentsFetchResponse> => {
        return new Promise((resolve, reject) => {
            clients.social.actions.FetchComments({
                parentID: eventId,
                metaData: metaData,
                callback: (err: RpcError, response: CommentsFetchResponse) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(response);
                    }
                }
            });
        });
    }

    const handleCommentDelete = (commendId: string) => {
        clients.social.actions.DeleteComments(commendId, null, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                setRefreshKey(prevKey => prevKey + 1);
            }
        })
    }

    const fetchData = async () => {
        try {
            const eventData = await fetchEventById(eventId ?? '', {});
            setEvent((prevState: any) => ({
                ...prevState,
                startDate: moment.unix(eventData.getStartat()).format('YYYY/MM/DD HH:mm:ss'),
                endDate: moment.unix(eventData.getEndat()).format('YYYY/MM/DD HH:mm:ss'),
                hostName: eventData.getAuthorinfo()?.getName(),
                description: eventData.getDescription(),
                mode: eventData.getType() === 0 ? 'Online' : 'Offline',
                numAttendees: eventData.getNumattendees(),
                slots: eventData.getNumslots(),
                link: eventData.getOnlinelink(),
                name: eventData.getTitle(),
                tag: eventData.getTagsList()[0],
            }));
            setMediaUrls(eventData.getMediaurlsList().map((media) => ({ url: media.getUrl(), mimeType: media.getMimetype() })));
        } catch (error) {
            console.error('Error fetching event data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [eventId]);

    useEffect(() => {
        fetchCommetsByID(eventId ?? '', {})
            .then((commentData) => {
                setComments(commentData.getCommentsList());
            })
            .catch((err) => {
                console.error('Error fetching comments')
            })
    }, [eventId, refreshKey]);

    return (
        <div className="w-full p-5 border-2 border-f_text rounded-lg mt-2 flex flex-col gap-3 font-mainfont text-w_text bg-main_black">
            <div className="flex gap-5 cursor-pointer">
                {/* back to event list */}
                <img src={navArrowIcon} alt="" />
                <a className=" uppercase tracking-widest  text-base" href="/events">
                    Back To Events
                </a>
            </div>
            <div className="flex justify-between flex-wrap">
                <div className="flex flex-col gap-3 w-[50%]">
                    <div className="mt-5 px-6 flex flex-col gap-3 ">
                        <h1 className=" font-semibold text-2xl">
                            <p>{event?.name}</p>
                        </h1>
                        {/* title */}
                        <p className="text-base">
                            <p>{event?.description}</p>
                        </p>
                        {/* desc */}
                    </div>
                    <div className="flex justify-between text-base">
                        <div className="flex ">
                            <p className=" text-f_text">Start Date : </p>
                            <p>{event?.startDate}</p>
                        </div>
                        <div className="flex">
                            <p className="text-f_text">End Date : </p>
                            <p>{event?.endDate}</p>
                        </div>
                    </div>
                    <div className="flex justify-between text-base">
                        <div className="flex ">
                            <p className=" text-f_text">Duration : </p>
                            <p>5</p>
                            <p>Hr</p>
                        </div>
                        <div className="flex font-mainfont ">
                            <p className="text-f_text">Available Slots : </p>
                            <p>{event?.slots}</p>
                        </div>
                    </div>
                    <div className="flex justify-between text-base">
                        <div className="flex ">
                            <p className=" text-f_text">Mode : </p>
                            <p>{event?.mode}</p>
                        </div>
                        <div className="flex font-mainfont ">
                            <p className="text-f_text">Tag : </p>
                            <p>{event?.tag}</p>
                        </div>
                    </div>
                    <div className="flex flex-col  gap-3 text-base">
                        <div className="flex ">
                            <p className=" text-f_text">Link : </p>
                            <p>{event?.link}</p>
                        </div>
                    </div>
                </div>
                <div className=" mt-16 w-[40%] h-[100%] border-2 overflow-x-scroll overflow-y-hidden">
                    <div className="h-[252px] flex overflow-x-scroll  scrollbar-hide">
                        {Array.from(mediaUrls).map((mediaurl, index) => (
                            <div key={index} className="relative mr-2">
                                <img
                                    src={mediaurl.url}
                                    alt={`Poster ${index + 1}`}
                                    style={{
                                        maxWidth: "394px",
                                        maxHeight: "252px",
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex gap-4 mt-5">
                <button className=" uppercase tracking-wider font-semibold px-4 py-1 bg-green_primary rounded border">
                    Update Event
                </button>
                <button className=" uppercase tracking-wider font-semibold px-4 py-1 bg-green_primary rounded border">
                    Launch Event
                </button>
                <button className=" uppercase tracking-wider font-semibold px-4 py-1 bg-red_primary rounded border">
                    Delete Event
                </button>
            </div>
            <div className="flex gap-2 items-center ">
                <img src={groupIcon} className="w-8" alt="" />
                <p className="text-base">Subscribers : </p>
                <p className="text-base  text-green_primary">{event?.numAttendees}</p>
            </div>
            <div className="w-full">
                <div className="flex gap-3 my-5">
                    <p className="text-xl">300</p>
                    <p className=" uppercase text-xl tracking-widest">
                        Comments :
                    </p>
                </div>
                {comments.map((comment, index) => (
                    <div key={index} className="flex flex-col gap-2 mb-5">
                        <div className="w-full flex gap-5  justify-between text-base">
                            <div className="flex gap-2  max-w-[80%]">
                                <img src={comment.getAuthorinfo()?.getPhotourl()} alt="" className="border  w-10 h-10 rounded-full" />
                                <div className="flex flex-col ">
                                    <p className="font-semibold">{comment.getAuthorinfo()?.getName()}</p>
                                    <p>{comment.getContent()}</p>
                                </div>
                            </div>
                            <div className="flex gap-3 items-center">
                                <img src={likeIcon} alt="" />
                                <p className="text-base">300</p>
                                <button
                                    onClick={() => handleCommentDelete(comment.getCommentid())}
                                    className=" uppercase tracking-wide  px-3 py-1 text-sm bg-red_primary rounded border">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DetailView;
