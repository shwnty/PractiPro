<?php

require_once 'global.php';

class Delete extends GlobalMethods
{

    private $pdo;
    public function __construct(\PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function delete_user($id)
    {
        $sql = "DELETE FROM user WHERE id = ?";
        try {
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute(
                [
                    $id
                ]
            );
            return $this->sendPayload(null, "success", "Successfully deleted record", 200);
        } catch (PDOException $e) {
            $errmsg = $e->getMessage();
            $code = 400;
        }

        return $this->sendPayload(null, "failed", $errmsg, $code);
    }


    public function unassignCoordinatorFromClass($id, $class)
    {
        $sql = "DELETE FROM rl_class_coordinators
                WHERE coordinator_id = :coordinator_id AND block_name = :block_name";

        try {
            $stmt = $this->pdo->prepare($sql);
            $stmt->bindParam(':coordinator_id', $id, PDO::PARAM_INT);
            $stmt->bindParam(':block_name', $class, PDO::PARAM_STR);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                return $this->sendPayload(null, 'success', "Successfully deleted the class assignment.", 200);
            } else {
                return $this->sendPayload(null, 'failed', "No class assignment found for the provided coordinator ID and block name.", 404);
            }
        } catch (PDOException $e) {
            return $this->sendPayload(null, 'failed', $e->getMessage(), 500);
        }
    }

    public function deleteSubmission($id, $table)
    {
        $sql = "DELETE FROM $table
                WHERE id = :id";

        try {
            $stmt = $this->pdo->prepare($sql);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->execute();

            return $this->sendPayload(null, "success", "Successfully deleted record", 200);
        } catch (PDOException $e) {
            return $this->sendPayload(null, 'failed', $e->getMessage(), 500);
        }
    }

    public function removeStudentFromSupervisor($supervisor_id, $student_id)
    {
        $sql = "DELETE FROM rl_supervisor_students
                WHERE supervisor_id = :supervisor_id AND student_id = :student_id";

        try {
            $stmt = $this->pdo->prepare($sql);
            $stmt->bindParam(':supervisor_id', $supervisor_id, PDO::PARAM_INT);
            $stmt->bindParam(':student_id', $student_id, PDO::PARAM_STR);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                return $this->sendPayload(null, 'success', "Successfully removed student from supervisor selection.", 200);
            } else {
                return $this->sendPayload(null, 'failed', "No student found from supervisor selection", 404);
            }
        } catch (PDOException $e) {
            return $this->sendPayload(null, 'failed', $e->getMessage(), 500);
        }
    }

    public function deleteAvatar($id)
    {
        $sql = "DELETE FROM user_avatars
                WHERE user_id = :id";

        try {
            $stmt = $this->pdo->prepare($sql);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->execute();

            return $this->sendPayload(null, "success", "Successfully deleted avatar", 200);
        } catch (PDOException $e) {
            return $this->sendPayload(null, 'failed', $e->getMessage(), 500);
        }
    }
}