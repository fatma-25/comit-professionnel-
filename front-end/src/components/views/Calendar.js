import React from "react";
import "devextreme/dist/css/dx.light.css";
import Scheduler from "devextreme-react/scheduler";

const data = [
  {
    text: "Stand Up",
    startDate: new Date("2021-12-10T16:30:00.000Z"),
    endDate: new Date("2021-12-10T18:30:00.000Z"),
  },
  {
    text: "Meet With Team ",
    startDate: new Date("2021-12-09T19:00:00.000Z"),
    endDate: new Date("2021-12-09T20:00:00.000Z"),
    allDay: true,
  },
  {
    text: "Meet With Client",
    startDate: new Date("2021-12-08T21:30:00.000Z"),
    endDate: new Date("2021-12-08T22:30:00.000Z"),
  },
  //   {
  //     text: "Approve Personal Computer Upgrade Plan",
  //     startDate: new Date("2021-03-30T17:00:00.000Z"),
  //     endDate: new Date("2021-03-30T18:00:00.000Z"),
  //   },
  //   {
  //     text: "Final Budget Review",
  //     startDate: new Date("2021-03-30T19:00:00.000Z"),
  //     endDate: new Date("2021-03-30T20:35:00.000Z"),
  //   },
  //   {
  //     text: "New Brochures",
  //     startDate: new Date("2021-03-30T21:30:00.000Z"),
  //     endDate: new Date("2021-03-30T22:45:00.000Z"),
  //   },
  //   {
  //     text: "Install New Database",
  //     startDate: new Date("2021-03-31T16:45:00.000Z"),
  //     endDate: new Date("2021-03-31T18:15:00.000Z"),
  //   },
  //   {
  //     text: "Approve New Online Marketing Strategy",
  //     startDate: new Date("2021-03-31T19:00:00.000Z"),
  //     endDate: new Date("2021-03-31T21:00:00.000Z"),
  //   },
  //   {
  //     text: "Upgrade Personal Computers",
  //     startDate: new Date("2021-03-31T22:15:00.000Z"),
  //     endDate: new Date("2021-03-31T23:30:00.000Z"),
  //   },
  //   {
  //     text: "Customer Workshop",
  //     startDate: new Date("2021-04-01T18:00:00.000Z"),
  //     endDate: new Date("2021-04-01T19:00:00.000Z"),
  //     allDay: true,
  //   },
  //   {
  //     text: "Prepare 2021 Marketing Plan",
  //     startDate: new Date("2021-04-01T18:00:00.000Z"),
  //     endDate: new Date("2021-04-01T20:30:00.000Z"),
  //   },
  //   {
  //     text: "Brochure Design Review",
  //     startDate: new Date("2021-04-01T21:00:00.000Z"),
  //     endDate: new Date("2021-04-01T22:30:00.000Z"),
  //   },
  //   {
  //     text: "Create Icons for Website",
  //     startDate: new Date("2021-04-02T17:00:00.000Z"),
  //     endDate: new Date("2021-04-02T18:30:00.000Z"),
  //   },
  //   {
  //     text: "Upgrade Server Hardware",
  //     startDate: new Date("2021-04-02T21:30:00.000Z"),
  //     endDate: new Date("2021-04-02T23:00:00.000Z"),
  //   },
  //   {
  //     text: "Submit New Website Design",
  //     startDate: new Date("2021-04-02T23:30:00.000Z"),
  //     endDate: new Date("2021-04-03T01:00:00.000Z"),
  //   },
  //   {
  //     text: "Launch New Website",
  //     startDate: new Date("2021-04-02T19:20:00.000Z"),
  //     endDate: new Date("2021-04-02T21:00:00.000Z"),
  //   },
];

const currentDate = new Date(2021, 11, 6);
const views = ["week", "month"];

class App extends React.Component {
  render() {
    return (
      <Scheduler
        timeZone="America/Los_Angeles"
        dataSource={data}
        views={views}
        defaultCurrentView="week"
        defaultCurrentDate={currentDate}
        height={800}
        startDayHour={9}
        width={1100}
      />
    );
  }
}

export default App;
