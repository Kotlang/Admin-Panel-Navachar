/* eslint-disable */

// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import React, { useState, useEffect } from 'react';
import { IUserPost, Icomments } from 'src/types';
import clients from 'src/clients';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import { Metadata, RpcError } from 'grpc-web';
import { CommentProto, CommentsFetchResponse } from 'src/generated/actions_pb'


const PostContainer: React.FC<IUserPost> = (Posts) => {
  const [showModal, setShowModal] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [comments, setComments] = useState<CommentProto[]>([]);

  const fetchCommetsByID = (eventId: string, metaData: Metadata | null): Promise<CommentsFetchResponse> => {
    return new Promise((resolve, reject) => {

      const commentRequset: Icomments = {
        parentID: eventId,
      }

      clients.social.actions.FetchComments(
        commentRequset, {}, (err: RpcError, response: CommentsFetchResponse) => {
          if (err) {
            reject(err);
          } else {
            resolve(response);
          }
        }
      );
    });
  }


  const handleCommentDelete = (commendId: string) => {
    clients.social.actions.DeleteComments(commendId, null, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(res);
        toast('comment deleted');
      }
    })
  }

  const handleHide = () => {
    setShowModal(true);
  };

  const deletePost = () => {
    clients.social.content.DeletePost(Posts.postId, null, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(res);
        window.location.reload();
        toast("Post Deleted");
      }
    });
  };

  const confirmDeletion = () => {
    console.log(Posts.postId)
    deletePost();
    setShowModal(false);
  };

  const nextMedia = () => {
    setCurrentMediaIndex((prevIndex) => (prevIndex + 1) % Posts.mediaUrls.length);
  };

  const prevMedia = () => {
    setCurrentMediaIndex((prevIndex) => (prevIndex - 1 + Posts.mediaUrls.length) % Posts.mediaUrls.length);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      fetchCommetsByID(Posts.postId, {})
        .then((commentData) => {
          setComments(commentData.getCommentsList());
        })
        .catch((err) => {
          console.error('Error fetching comments', err);
        });
    }, 5000);

    return () => clearInterval(interval);
  }, [Posts.postId]);

  return (
    <div className="post-container bg-white shadow-lg rounded-lg mx-auto my-4 relative w-4/5 lg:w-4/5 xl:w-4/5 h-96 overflow-hidden">
      <button className="hide-button absolute top-2.5 right-2.5 bg-red-500 text-white border-0 rounded px-2.5 py-1 cursor-pointer text-xs" onClick={() => handleHide()}>⌫</button>

      <div className="scrollable-content p-4 overflow-auto h-full">
        <div className="font-bold text-lg mb-2">{Posts.authorInfo.name}</div>
        <div className="relative">
          {Posts.mediaUrls.map((media, index) => (
            media.mimeType.startsWith('image/') &&
            <img
              key={index}
              src={media.url}
              alt="Post media"
              className={`w-auto h-auto object-cover object-center mb-2 ${index !== currentMediaIndex ? 'hidden' : ''}`}
            />
          ))}
          {Posts.mediaUrls.length > 1 && (
            <>
              <button onClick={prevMedia} className="navigation-button absolute left-0 top-1/2 bg-white bg-opacity-50 rounded-full p-2">
                &#8592;
              </button>
              <button onClick={nextMedia} className="navigation-button absolute right-0 top-1/2 bg-white bg-opacity-50 rounded-full p-2">
                &#8594;
              </button>
            </>
          )}
        </div>
        <p className="text-gray-700 text-base">{Posts.post}</p>
        <div className="comments-section mt-4">
          {comments.map((comment, index) => (
            <div key={index} className="comment bg-gray-100 p-2 rounded-lg mb-2 relative">
              <div className="comment-author flex items-center mb-1">
                <span className="font-semibold">{comment.getAuthorinfo()?.getName()}</span>
              </div>
              <p className="comment-content text-gray-600">{comment.getContent()}</p>

              {/* Delete Button */}
              <button
                onClick={() => handleCommentDelete(comment.getCommentid())}
                className="delete-comment-button absolute top-1 right-1 text-xs text-white p-1 rounded"
              >
                ❌
              </button>
            </div>
          ))}
        </div>
      </div>
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Delete Event"
        className="modal"
        style={{
          overlay: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
          content: {
            position: 'relative',
            top: 'auto',
            left: 'auto',
            right: 'auto',
            bottom: 'auto',
            margin: 'auto',
            maxWidth: '400px', // Adjust the maximum width as needed
            width: '100%',
            padding: '0',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <p className="text-lg font-semibold mb-4">Are you sure you want to delete this Post?</p>
          <div className="flex justify-end">
            <button
              onClick={() => confirmDeletion()}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Yes, delete
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>

  );

};

export default PostContainer;
