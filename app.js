class Cal {
  constructor(divId) {
    this.divId = divId

    this.DaysOfWeek = ['Mn', 'Tu', 'Wd', 'Th', 'Fr', 'Sa', 'Sn']

    this.Months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]

    let d = new Date()

    this.currMonth = d.getMonth('1')
    this.currYear = d.getFullYear('24')
    this.currDay = d.getDate('16')
  }
  nextMonth() {
    if (this.currMonth == 11) {
      this.currMonth = 0
      this.currYear = this.currYear + 1
    } else {
      this.currMonth = this.currMonth + 1
    }
    this.showcurr()
  }
  previousMonth() {
    if (this.currMonth == 0) {
      this.currMonth = 11
      this.currYear = this.currYear - 1
    } else {
      this.currMonth = this.currMonth - 1
    }
    this.showcurr()
  }
  showcurr() {
    this.showMonth(this.currYear, this.currMonth)
  }
  showMonth(y, m) {
    let d = new Date(),
      firstDayOfMonth = new Date(y, m, 7).getDay(),
      lastDateOfMonth = new Date(y, m + 1, 0).getDate(),
      lastDayOfLastMonth =
        m == 0 ? new Date(y - 1, 11, 0).getDate() : new Date(y, m, 0).getDate()

    let html = '<table>'

    html += '<thead><tr>'
    html += '<td colspan="7">' + this.Months[m] + ' ' + y + '</td>'
    html += '</tr></thead>'

    html += '<tr class="days">'
    for (var i = 0; i < this.DaysOfWeek.length; i++) {
      html += '<td>' + this.DaysOfWeek[i] + '</td>'
    }
    html += '</tr>'

    var i = 1
    do {
      let dow = new Date(y, m, i).getDay()

      if (dow == 1) {
        html += '<tr>'
      } else if (i == 1) {
        html += '<tr>'
        var k = lastDayOfLastMonth - firstDayOfMonth + 1
        for (var j = 0; j < firstDayOfMonth; j++) {
          html += '<td class="not-current">' + k + '</td>'
          k++
        }
      }

      let chk = new Date()
      let chkY = chk.getFullYear()
      let chkM = chk.getMonth()
      if (
        chkY == this.currYear &&
        chkM == this.currMonth &&
        i == this.currDay
      ) {
        html += '<td class="today">' + i + '</td>'
      } else {
        html += '<td class="normal">' + i + '</td>'
      }
      if (dow == 0) {
        html += '</tr>'
      } else if (i == lastDateOfMonth) {
        var k = 1
        for (dow; dow < 7; dow++) {
          html += '<td class="not-current">' + k + '</td>'
          k++
        }
      }

      i++
    } while (i <= lastDateOfMonth)

    html += '</table>'

    document.getElementById(this.divId).innerHTML = html
  }
}

window.onload = function () {
  const c = new Cal('divCal')
  c.showcurr()

  getId('btnNext').onclick = function () {
    c.nextMonth()
  }
  getId('btnPrev').onclick = function () {
    c.previousMonth()
  }
}

function getId(id) {
  return document.getElementById(id)
}
