import PropTypes from 'prop-types'


export const Progress = ({ percentage }) => {
  return (
    <div className="progress">
      <div className="progress-bar bg-info" role="progressbar" style={{width: `${percentage}%`}} >

        {percentage}%
      </div>

    </div>
  )
}

Progress.propTypes = {
  percentage: PropTypes.number.isRequired
}
