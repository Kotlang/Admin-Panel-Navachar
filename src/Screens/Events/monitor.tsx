/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2'; // Example for Chart.js
import 'chart.js/auto'; // Auto import for Chart.js
import { CommentProto, CommentsFetchResponse } from 'src/generated/actions_pb'
import { EventProto } from 'src/generated/events_pb';
import clients from 'src/clients';
import { Metadata, RpcError } from 'grpc-web';


const MonitorEvent: React.FC = () => {
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState<EventProto | undefined>();
  const [comments, setComments] = useState<CommentProto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const numReactsMap = eventDetails?.getNumreactsMap();
  const numReactsArray = numReactsMap ? numReactsMap.toArray() : [];

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

  const fetchData = () => {
    if (eventId) {
      fetchEventById(eventId, {})
        .then((eventData) => {
          setEventDetails(eventData);
        })
        .catch((error) => {
          console.error('Error fetching event:', error);
        });

      // Fetch comments
      const pageNumber = 1;
      const pageSize = 0;

      fetchCommetsByID(eventId, {})
        .then((commentData) => {
          setComments(commentData.getCommentsList());
        })
        .catch((err) => {
          console.error('Error fetching comments')
        })
    }
  };
  console.log(eventId)
  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [eventId]);

  useEffect(() => {
    if (eventDetails) {
      setLoading(false);
    }
  }, [eventDetails]);


  if (loading) return <div>Loading...</div>;

  // Chart data setup (example using numAttendees)
  const chartData = {
    labels: ['Attendees', 'Comments', 'Reacts'],
    datasets: [{
      label: 'Event Metrics',
      data: [eventDetails?.getNumattendees(), eventDetails?.getNumcomments(), numReactsArray.reduce((acc: number, value: number) => acc + value, 0)],
      backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(75, 192, 192, 0.2)'],
      borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)'],
      borderWidth: 1
    }]
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold text-center my-4">{eventDetails?.getTitle()}</h2>

      {/* Chart for Event Metrics */}
      <div>
        <Line data={chartData} />
      </div>

      {/* Comments Table */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold">Comments</h3>
        <table className="min-w-full table-auto border-collapse border border-gray-200 mt-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-gray-600">Comment ID</th>
              <th className="border border-gray-300 px-4 py-2 text-gray-600">User ID</th>
              <th className="border border-gray-300 px-4 py-2 text-gray-600">Content</th>
              {/* Additional columns if needed */}
            </tr>
          </thead>
          <tbody>
            {comments.map(comment => (
              <tr key={comment.getCommentid()} className="bg-white">
                <td className="border border-gray-300 px-4 py-2">{comment.getCommentid()}</td>
                <td className="border border-gray-300 px-4 py-2">{comment.getUserid()}</td>
                <td className="border border-gray-300 px-4 py-2">{comment.getContent()}</td>
                {/* Additional data cells if needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MonitorEvent;