import React from "react";

const Meeting = ({ params }: { params: { id: string } }) => {
  return <div className="text-white text-2xl">The meeting id: {params.id}</div>;
};

export default Meeting;
