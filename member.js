function skillsMember() {
  return {
    restrict: 'E',
    templateUrl: 'templates/skills-member.html',
    scope: {
      member: '='
    },
    controller: function($scope) {
      $scope.getMemberImage = function(member) {
        if (member.image) {
          return member.image;
        } else {
          return 'images/placeholder.png';
        }
      };
    }
  };
}