function book () {
    // PREVENT MULTIPLE SUBMIT
    document.getElementById("bookGo").disabled = true;
   
    // COLLECT FORM DATA
    let data = new FormData(document.getElementById("bookForm"));
   
    // SEND!
    fetch("/book", { method:"POST", body:data })
    .then(res => {
      if (res.status==200) { location.href = "/thankyou"; }
      else { alert("Opps an error has occured."); }
    })
    .catch(err => {
      console.error(err);
      alert("Opps an error has occured.");
    });
    return false;
  }
   
  // INIT
  window.onload = () => {
    // MIN SELECTABLE DATE IS TODAY
    let datepick = document.getElementsByName("date")[0];
    datepick.min = new Date().toISOString().split("T")[0];
   
    // ENABLE FORM
    document.getElementById("bookGo").disabled = false;
  };