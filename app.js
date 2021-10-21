//listen for submit
document.querySelector('#loan-form').addEventListener('submit',function(e){
    //hide results
    document.getElementById('results').style.display='none';

    //show loader
    document.getElementById('loading').style.display='block';

    setTimeout(calculateResults,2000);

    e.preventDefault();
});

//calculate results
function calculateResults() {
    //UI vars
    const UIamount = document.getElementById('amount');
    const UIinterest = document.getElementById('interest');
    const UIyears = document.getElementById('years');
    const UImonthlyPayment = document.getElementById('monthly-payment');
    const UItotalPayment = document.getElementById('total-payment');
    const UItotalInterest = document.getElementById('total-interest');

    const principal = parseFloat(UIamount.value);
    const calculatedInterest = parseFloat(UIinterest.value)/100/12;
    const calculatedPayments = parseFloat(UIyears.value)*12;

    //compute monthly paymemt
    const x = Math.pow(1+calculatedInterest,calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);
    if(isFinite(monthly)){
         UImonthlyPayment.value = monthly.toFixed(2);
         UItotalPayment.value = (monthly*calculatedPayments).toFixed(2);
         UItotalInterest.value = ((monthly*calculatedPayments)-principal).toFixed(2);

         //show results
         document.getElementById('results').style.display='block';

         //hide loader
         document.getElementById('loading').style.display='none';
    }else{
       showError('Please Check Your Numbers');
    }

    
}

//show error

function showError(error){

    //hide results
    document.getElementById('results').style.display='none';
    
    //hide loader
    document.getElementById('loading').style.display='none';
    //create a div
    const errorDiv = document.createElement('div');
    //get element
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    //add class
    errorDiv.className = 'alert alert-danger';
    //create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));
    //insert error above heading
    card.insertBefore(errorDiv,heading);
    //clear error after 3 seconds
    setTimeout(clearError,3000);
}

//clear error
function clearError(){
    document.querySelector('.alert').remove();
}