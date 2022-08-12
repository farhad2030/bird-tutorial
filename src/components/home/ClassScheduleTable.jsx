import React from 'react'
import ClassScheduleTableRow from './ClassScheduleTableRow'

const ClassScheduleTable = () => {
  return (
    <div class="overflow-x-auto w-full mb-10 px-10">
    <table class="table w-full text-center ">
      {/* <!-- head --> */}
      <thead>
        <tr>
          <th>Batch Name</th>
          <th>Class</th>
          <th>Batch time</th>
          <th>star date</th>
           
        </tr>
      </thead>
      <tbody>
        {/* <!-- row 1 --> */}
        
        <ClassScheduleTableRow/>
        <ClassScheduleTableRow/>
        <ClassScheduleTableRow/>
        <ClassScheduleTableRow/>
        <ClassScheduleTableRow/>

      </tbody>
  
      
    </table>
  </div>
  )
}

export default ClassScheduleTable