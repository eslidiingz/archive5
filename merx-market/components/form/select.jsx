import Dropdown from 'react-bootstrap/Dropdown';


function Select(props) {

    return (
      <>
        {/* <div className={props.className}>
            <select className="form-select input-search-set height-54"  aria-label="Default select example">
                <option selected>{props.selected}</option>
                <option value="1">{props.value1}</option>
                <option value="2">{props.value2}</option>
                <option value="3">{props.value3}</option>
            </select>
        </div> */}
        <div className="layout_main-dropdown">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <p className='m-0 d-flex w-100'>{props.selected}</p>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">{props.value1}</Dropdown.Item>
                <Dropdown.Item href="#/action-2">{props.value2}</Dropdown.Item>
                <Dropdown.Item href="#/action-3">{props.value3}</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
      </>
    )
  }
  export default Select
  