
import "../Styles/learning.css";
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


function Hello(){
    return(
        <>
             <div className="course-learn">
             <div className="course-item">
  <div className="learn-icon">
    <img
      src="/teacher (1).png"
      alt="Logo"
      style={{
        width: '70px',  // Adjust size as needed
        height: '90px', // Adjust size as needed
        borderRadius: '10%',
        objectFit: 'cover',
      }}
    />
  </div>
  <div className="learn-content"  >
    <div className="learn-name">React</div>
    <div className="learn-descrp">
      React for devlopers
    </div>
  </div>
  <div className="learn-bar">


  <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                        <CircularProgress 
                          variant="determinate" 
                          // value={course.status === "Completed" ? 100 : randomNumber} 
                          value="90"
                          color="white"
                          size={56}
                          sx={{  
                            '& .MuiCircularProgress-circle': {
                              stroke: '#FF5722', // Set custom stroke color
                            },
                          }} 
                        />
                        <Box
                          sx={{
                            position:"absolute",
                            marginLeft:"11.5px",
                            marginTop:"16px"
                          }}
                        >
                          <Typography variant="caption"  sx={{fontSize:"18px" ,color:"black" }} >
                            {/* { course.status === "Completed" ? 100 : randomNumber}% */}
                            100
                          </Typography>
                        </Box>
                      </Box>
  </div>
</div>

             </div>
        </>
    )

}

export default Hello;