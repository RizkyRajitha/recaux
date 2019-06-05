import React, { Component } from 'react';
import { Col , Row, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


    
  
      
class evaluation extends Component{
    
    
      
      
        state = {
          Name: '',
          Role: '',
          Date:'',
          InterviewedBy:'',
          academicBackground:'',
          industryExperience:'',
          currentPosition:'',
          currentEmployer:'',
          skill1:'',
          skill2:'',
          skill3:'',
          skill4:'',
          skill5:'',
          skill6:'',
          skill7:'',
          skill8:'',
          skill9:'',
          skill10:'',
          skill11:'',
          skill12:'',
          skill13:'',
          skill14:'',
          rate1:'',
          rate2:'',
          rate3:'',
          rate4:'',
          rate5:'',
          rate6:'',
          rate7:'',
          rate8:'',
          rate9:'',
          rate10:'',
          rate11:'',
          rate12:'',
          rate13:'',
          rate14:'',
          overrallRating:'',
          Summary:'',
          salary1:'',
          salary2:'',
          salary3:'',
          salary4:'',
          period1:'',
          period2:'',
          approve:'',
          

        
      };

      change = e =>{
          this.setState(
              {
                  [e.target.name]:e.target.value
              }
          );
      };
      
     onSubmit=(e) => {
         e.preventDefault()
         console.log(this.state);
     }



    render(){
        return (
            
            <div  class="container " >
            <div class="p-3 mb-2 bg-dark text-white">
                
                <span class="border border-primary rounded-lg" ></span>
                <p class="bg-dark text-white">Auxenta Interview Evaluation Form</p> 
                <Form>
                            
                            
                                <div class="form-group row">
                                <label class="col-sm-2 col-form-label">Name: </label>
                                <div class="col-sm-10">
                                <input
                                placeholder='Name'
                                type='text'
                                
                                name='Name'
                                class="form-control" 
                                value={this.state.Name}
                                onChange={e => this.change(e)}
                                />
                                </div>
                                </div>
                            
                            
                            
                                <div class="form-group row">
                                <label class="col-sm-2 col-form-label">Role:  </label>
                                <div class="col-sm-10">
                                <input
                                placeholder='Role'
                                type='text'
                                size='75'
                                name='Role'
                                class="form-control"
                                value={this.state.Role}
                                onChange={e => this.change(e)}
                            />
                            </div>
                            </div>
                        
                            <div class ="form-group row">    
                            <label  class="col-sm-2 col-form-label">Date:</label>
                            <div class="col-sm-10">
                            <input
                                placeholder='Date'
                                type='Date'
                                size='75'
                                name='Date'
                                class="form-control"
                                value={this.state.Date}
                                onChange={e => this.change(e)}
                            />
                            </div>
                            </div>
                            <div class ="form-group row">
                            <label class="col-sm-2 col-form-label">Interviewed By:  </label>
                            <div class="col-sm-10">
                            <input
                                placeholder='Interviewed By'
                                type='text'
                                size='50'
                                name='InterviewedBy'
                                class="form-control"
                                value={this.state.InterviewedBy}
                                onChange={e => this.change(e)}
                            />
                            </div>
                            </div>


                                <div class="form-group">
                                    <label>Academic Background : </label>
                                    <textarea
                                    name='academicBackground'
                                    class="form-control"
                                    rows="3"
                                    value={this.state.description} 
                                    onChange={e => this.change(e)}
                                    />
                                    </div>

                                    <div class="form-group">       
                                    <label>Industry Experience : </label>
                                    <textarea 
                                    name='industryExperience'
                                    class="form-control"
                                    rows="3"
                                    value={this.state.description}
                                    onChange={e =>this.change(e)}
                                    />
                                    </div>

                                    <div class="form-group"> 
                                    <label>Current position & period : </label>
                                    <textarea 
                                    name='currentPosition'
                                    class="form-control"
                                    rows="3"
                                    value={this.state.description}
                                    onChange={e => this.change(e)} />
                                    </div>

                                    <div class="form-group">
                                    <label>Current Empolyer : </label>
                                    <textarea
                                    name='currentEmployer'
                                    class="form-control"
                                    rows="3"
                                    value={this.state.description}
                                    onChange={e => this.change(e)} />
                                    </div>
                                                 
                                
                                <p>Technical skill set(Rate out of 5 & 5 is the high rate ) : </p>
                                <input
                                placeholder=''
                                type='text'
                                size='50'
                                name='skill1'
                                value={this.state.skill1}
                                onChange={e => this.change(e)}
                            /><input
                                placeholder=''
                                type='number' max='5' min='0'
                                name='rate1'
                                value={this.state.rate1}
                                onChange={e => this.change(e)}
                            />
                            <br/>

                            <input
                                placeholder=''
                                type='text'
                                name='skill2'
                                size='50'
                                value={this.state.skill2}
                                onChange={e => this.change(e)}
                            /><input
                                placeholder=''
                                type='number' max='5' min='0'
                                name='rate2'
                                value={this.state.rate2}
                                onChange={e => this.change(e)}
                            />
                            <br/>
                            
                            <input
                                placeholder=''
                                type='text'
                                size='50'
                                name='skill3'
                                value={this.state.skill3}
                                onChange={e => this.change(e)}
                            /><input
                                placeholder=''
                                type='number' max='5' min='0'
                                name='rate3'
                                value={this.state.rate3}
                                onChange={e => this.change(e)}
                            />
                            <br/>

                            <input
                                placeholder=''
                                type='text'
                                name='skill4'
                                size='50'
                                value={this.state.skill4}
                                onChange={e => this.change(e)}
                            /><input
                                placeholder=''
                                type='number' max='5' min='0'
                                name='rate4'
                                value={this.state.rate4}
                                onChange={e => this.change(e)}
                            />
                            <br/>
                            
                            <input
                                placeholder=''
                                type='text'
                                size='50'
                                name='skill5'
                                value={this.state.skill5}
                                onChange={e => this.change(e)}
                            /><input
                                placeholder=''
                                type='number' max='5' min='0'
                                name='rate5'
                                value={this.state.rate5}
                                onChange={e => this.change(e)}
                            /><br/>

                            
                            <input
                                placeholder=''
                                type='text'
                                size='50'
                                name='skill6'
                                value={this.state.skill6}
                                onChange={e => this.change(e)}
                            /><input
                                placeholder=''
                                type='number'max='5' min='0'
                                name='rate6' 
                                value={this.state.rate6}
                                onChange={e => this.change(e)}
                            />
                            <br/>

                            <input
                                placeholder=''
                                type='text'
                                name='skill7'
                                size='50'
                                value={this.state.skill7}
                                onChange={e => this.change(e)}
                            /><input
                                placeholder=''
                                type='number' max='5' min='0'
                                name='rate7'
                                value={this.state.rate7}
                                onChange={e => this.change(e)}
                            /><br/>
                            
                            <input
                                placeholder=''
                                type='text'
                                name='skill8'
                                size='50'
                                value={this.state.skill8}
                                onChange={e => this.change(e)}
                            /><input
                                placeholder=''
                                type='number' max='5' min='0'
                                name='rate8'
                                value={this.state.rate8}
                                onChange={e => this.change(e)}
                            />
                            <br/>

                            <input
                                placeholder=''
                                type='text'
                                name='skill9'
                                size='50'
                                value={this.state.skill9}
                                onChange={e => this.change(e)}
                            /><input
                                placeholder=''
                                type='number' max='5' min='0'
                                name='rate9'
                                value={this.state.rate9}
                                onChange={e => this.change(e)}
                            />
                            <br/>

                            <input
                                placeholder=''
                                type='text'
                                name='skill10'
                                size='50'
                                value={this.state.skill10}
                                onChange={e => this.change(e)}
                            /><input
                                placeholder=''
                                type='number' max='5' min='0'
                                name='rate10'
                                value={this.state.rate10}
                                onChange={e => this.change(e)}
                            />
                            <br/><br/>
                            <p>Communication   : </p>
                            <input
                                placeholder=''
                                type='text'
                                name='skill11'
                                size='50'
                                value={this.state.skill11}
                                onChange={e => this.change(e)}
                            /><input
                                placeholder=''
                                type='number' max='5' min='0'
                                name='rate11'
                                value={this.state.rate11}
                                onChange={e => this.change(e)}
                            />
                            <br/><br/>

                            <p>Leadership Skills: </p>
                            <input
                                placeholder=''
                                type='text'
                                name='skill12'
                                size='50'
                                value={this.state.skill12}
                                onChange={e => this.change(e)}
                            /><input
                                placeholder=''
                                type='number' max='5' min='0'
                                name='rate12'
                                value={this.state.rate12}
                                onChange={e => this.change(e)}
                            />
                            <br/><br/>

                            <p>Team work: </p>
                            <input
                                placeholder=''
                                type='text'
                                name='skill13'
                                size='50'
                                value={this.state.skill13}
                                onChange={e => this.change(e)}
                            /><input
                                placeholder=''
                                type='number' max='5' min='0'
                                name='rate13'
                                value={this.state.rate13}
                                onChange={e => this.change(e)}
                            />
                            <br/><br/>
                            
                            <p>Special Notes : </p>
                            <input
                                placeholder=''
                                type='text'
                                name='skill14'
                                size='50'
                                value={this.state.skill14}
                                onChange={e => this.change(e)}
                            /><input
                                placeholder=''
                                type='number' max='5' min='0'
                                name='rate14'
                                value={this.state.rate14}
                                onChange={e => this.change(e)}
                            />
                            <br/><br/>

                            <p>Overrall Rating</p>
                            <input
                                placeholder=''
                                type='number' min='0'
                                name='overrallRating'
                                value={this.state.overrallRating}
                                onChange={e => this.change(e)}
                            />
                            <br/><br/>
                            
                            <div class="form-group"> 
                            <label>Summary & Recomandation from the interviewer</label>
                                <textarea
                                 name='Summary'
                                 class="form-control"
                                 rows="3"
                                 value={this.state.description}
                                 onChange={e => this.change(e)} />
                                 </div>

                            <hr/>
                            <p>HR Report</p>
                            
                            <div class="form-row">
                            <div class="form-group col-md-6">
                            <label>Salary Expected : </label>
                            <input
                                type='Currency'
                                name='salary1'
                                class="form-control"
                                value={this.state.salary1}
                                onChange={e => this.change(e)}
                            />
                            </div>
                            <div class="form-group col-md-6">

                            <label>Current Salary :  </label>
                            <input
                                type='text'
                                name='salary2'
                                class="form-control"
                                value={this.state.salary2}
                                onChange={e => this.change(e)}
                            />
                            </div>
                            </div>
                            
                            <div class="form-row">
                            <div class="form-group col-md-6">

                            <label>Salary Band : </label>
                            <input
                                type='text'
                                name='salary3'
                                class="form-control"
                                value={this.state.salary3}
                                onChange={e => this.change(e)}
                            />
                            </div>
                            <div class="form-group col-md-6">
                            <label>Agreed Salary :  </label>
                            <input 
                                type='text'
                                name='salary4'
                                class="form-control"
                                value={this.state.salary4}
                                onChange={e => this.change(e)}
                            />
                            </div>
                            </div>
                            

                            <div class="form-row">
                            <div class="form-group col-md-6">
                            <label>Notice period : </label>
                            <input
                                type='text'
                                name='period1'
                                class="form-control"
                                value={this.state.period1}
                                onChange={e => this.change(e)}
                            />
                            </div>
                            <div class="form-group col-md-6">
                            <label>Starting Date :  </label>
                            <input
                                type='Date'
                                name='period2'
                                class="form-control"
                                value={this.state.period2}
                                onChange={e => this.change(e)}
                            />
                            </div>
                            </div>
                            <br/>
                            <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Approved By :  </label>
                            <div class="col-sm-10">
                            <input
                                type='text'
                                name='approve'required
                                class="form-control"
                                value={this.state.approve}
                                onChange={e => this.change(e)}
                            />
                            </div>
                            </div>
                            <br/>

                            <FormGroup row>
                            <Label for="exampleFile" sm={2}>Attach Documents:</Label>
                            <Col sm={10}>
                            <Input type="file" name="file" id="exampleFile" />
                            <FormText color="muted">
                            </FormText>
                            </Col>
                            </FormGroup>
                             
                            <br/>
                            <Button outline color="primary" onClick={this.onSubmit} >Submit</Button>{' '}
                    </Form>
    
                    </div>
                    </div>

        );
    }
}

export default evaluation;
