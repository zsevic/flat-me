import request from "utils/request";

export const sendFeedback = async (feedbackDto) =>
  request.post("/feedbacks", feedbackDto);
